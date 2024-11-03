import type { Analysis } from "@/types/Analysis";
import { Box, Fade, Paper, Typography } from "@mui/material";

interface AnalysisResultProps {
  analysis: Analysis | null;
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  return (
    <Fade in={!!analysis} timeout={500}>
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
        {analysis && (
          <>
            <Typography variant="h6">Analysis Result:</Typography>
            <Typography variant="body1">
              <strong>Analysis ID:</strong> {analysis.analysis_id}
            </Typography>
            <Typography variant="body1">
              <strong>Patent ID:</strong> {analysis.patent_id}
            </Typography>
            <Typography variant="body1">
              <strong>Company Name:</strong> {analysis.company_name}
            </Typography>
            <Typography variant="body1">
              <strong>Analysis Date:</strong> {analysis.analysis_date}
            </Typography>
            <Typography variant="h6" mt={2}>
              Top Infringing Products:
            </Typography>
            {analysis.top_infringing_products.map((product, index) => (
              <Box key={index} mb={2} p={2} border={1} borderRadius={2}>
                <Typography variant="body1">
                  <strong>Product Name:</strong> {product.product_name}
                </Typography>
                <Typography variant="body1">
                  <strong>Infringement Likelihood:</strong>{" "}
                  {product.infringement_likelihood}
                </Typography>
                <Typography variant="body1">
                  <strong>Relevant Claims:</strong>{" "}
                  {product.relevant_claims.join(", ")}
                </Typography>
                <Typography variant="body1">
                  <strong>Explanation:</strong> {product.explanation}
                </Typography>
                <Typography variant="body1">
                  <strong>Specific Features:</strong>{" "}
                  {product.specific_features.join(", ")}
                </Typography>
              </Box>
            ))}
            <Typography variant="h6" mt={2}>
              Overall Risk Assessment:
            </Typography>
            <Typography variant="body1">
              {analysis.overall_risk_assessment}
            </Typography>
          </>
        )}
      </Paper>
    </Fade>
  );
}
