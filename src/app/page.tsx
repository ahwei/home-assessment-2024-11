"use client";
import AnalysisResult from "@/components/AnalysisResult";
import companyData from "@/data/company_products.json";
import patentData from "@/data/patents.json";
import type { Analysis } from "@/types/Analysis";
import type { CompanyData } from "@/types/Company";
import type { Patent } from "@/types/Patent";
import { getAnalysisHistory, saveAnalysis } from "@/utils/indexedDB";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Autocomplete,
  Box,
  Chip,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const data: CompanyData = companyData;
const patents: Patent[] = patentData;

const companies = data.companies.map((company) => company.name);
const patentTitles = patents.map((patent) => patent.title);

const getSelectedPatentId = (title: string | null): number | null => {
  if (!title) return null;
  const patent = patents.find((patent) => patent.title === title);
  return patent ? patent.id : null;
};

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedPatent, setSelectedPatent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [history, setHistory] = useState<Analysis[]>([]);

  const onCompare = async () => {
    setLoading(true);
    setAnalysis(null);

    const selectedPatentId = getSelectedPatentId(selectedPatent);

    try {
      const response = await axios.post("/api/ai", {
        patentId: selectedPatentId,
        companyName: selectedCompany,
      });

      if (response.status === 200) {
        const analysisData = response.data.data;
        setAnalysis(analysisData);
        await saveAnalysis(analysisData);
        setHistory(await getAnalysisHistory());
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error("Failed to fetch analysis:", error);
    }

    setLoading(false);
  };

  const handleHistoryClick = (analysis: Analysis) => {
    setAnalysis(analysis);
  };

  useEffect(() => {
    (async () => {
      const historyData = await getAnalysisHistory();
      setHistory(historyData.slice(-5));
    })();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      pt={10}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 800,
          width: "100%",
          margin: 2,
          textAlign: "center",
        }}
      >
        <Autocomplete
          options={patentTitles}
          value={selectedPatent}
          onChange={(event, newValue) => setSelectedPatent(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Patent: " fullWidth />
          )}
          sx={{ mb: 2 }}
        />
        <Autocomplete
          options={companies}
          value={selectedCompany}
          onChange={(event, newValue) => {
            setSelectedCompany(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Company Name:" fullWidth />
          )}
          sx={{ mb: 2 }}
        />
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={onCompare}
          loading={loading}
          loadingPosition="end"
          disabled={!selectedCompany || !selectedPatent || loading}
          sx={{ mb: 2 }}
        >
          Analysis
        </LoadingButton>
        {history.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">History:</Typography>
            {history.map((item, index) => (
              <Chip
                key={index}
                label={`${item.company_name} + ${item.patent_id}`}
                onClick={() => handleHistoryClick(item)}
                sx={{ margin: 0.5 }}
              />
            ))}
          </Box>
        )}
      </Paper>

      {loading ? (
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            maxWidth: 800,
            width: "100%",
            margin: 2,
            textAlign: "center",
          }}
        >
          <Box mt={2}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="rectangular" width="100%" height={118} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="50%" />
          </Box>
        </Paper>
      ) : (
        <AnalysisResult analysis={analysis} />
      )}
    </Box>
  );
}
