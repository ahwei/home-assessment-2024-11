"use client";
import companyData from "@/data/company_products.json";
import patentData from "@/data/patents.json";
import type { CompanyData } from "@/types/Company";
import type { Patent } from "@/types/Patent";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Autocomplete,
  Box,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

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
  const [analysis, setAnalysis] = useState(null);

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
        setAnalysis(response.data.data);
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error("Failed to fetch analysis:", error);
    }

    setLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
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
            <TextField {...params} label="Patent ID: " fullWidth />
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
        >
          Prepare
        </LoadingButton>
        {loading && (
          <Skeleton variant="rectangular" width="100%" height={200} />
        )}
        {analysis && (
          <Box mt={2}>
            <Typography variant="h6">Analysis Result:</Typography>
            <pre>{JSON.stringify(analysis, null, 2)}</pre>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
