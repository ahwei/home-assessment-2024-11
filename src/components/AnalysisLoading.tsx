import { Box, Paper, Skeleton, Typography } from "@mui/material";

const AnalysisLoading = () => {
  return (
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
        <Typography variant="h6">
          <Skeleton width="40%" />
        </Typography>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="60%" />
        <Typography variant="h6" mt={2}>
          <Skeleton width="50%" />
        </Typography>
        <Box mb={2} p={2} border={1} borderRadius={2}>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="80%" />
        </Box>
        <Typography variant="h6" mt={2}>
          <Skeleton width="50%" />
        </Typography>
        <Skeleton variant="text" width="80%" />
      </Box>
    </Paper>
  );
};

export default AnalysisLoading;
