import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const CenteredSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        "align-items": "center",
        "justify-content": "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
