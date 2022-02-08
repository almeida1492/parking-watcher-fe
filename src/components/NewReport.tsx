import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { API_BASE_PATH } from "../config/consts";
import { useLoadCurrentPos } from "../hooks/useLoadCurrentPos";
import { useLoadReversedGeocode } from "../hooks/useLoadReversedGeocode";
import { IReport, TActivityStatus } from "../types";
import { CenteredSpinner } from "./CenteredSpinner";
import { DialogCreateReportSuccess } from "./DialogCreateReportSuccess";

type TFormData = Omit<IReport, "id" | "createdAt" | "isActive" | "lat" | "lng">;

const lotColorOptions = ["blue", "white", "yellow"];

const NewReport = () => {
  const currentPosLoader = useLoadCurrentPos();
  const [status, setStatus] = useState<TActivityStatus>("IDLE");
  const reversedGeocodeLoader = useLoadReversedGeocode(currentPosLoader.data);

  const [report, setReport] = useState<TFormData>({
    reporter: "",
    streetName: "",
    neighborhood: "",
    civicNumber: "",
    lotColor: "blue",
  });

  useEffect(() => {
    if (
      currentPosLoader.status === "LOADING" ||
      reversedGeocodeLoader.status === "LOADING"
    ) {
      setStatus("LOADING");
    } else if (
      currentPosLoader.status === "READY" &&
      reversedGeocodeLoader.status === "READY"
    ) {
      setStatus("IDLE");
    } else if (
      currentPosLoader.status === "ERROR" &&
      reversedGeocodeLoader.status === "ERROR"
    ) {
      setStatus("ERROR");
    }
  }, [currentPosLoader.status, reversedGeocodeLoader.status]);

  useEffect(() => {
    if (reversedGeocodeLoader.data) {
      setReport((prevState) => ({
        ...prevState,
        ...reversedGeocodeLoader.data,
      }));
    }
  }, [reversedGeocodeLoader.data]);

  const onChange = (e: any) => {
    setReport((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = () => {
    setStatus("LOADING");
    fetch(`${API_BASE_PATH}/reports/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...report, ...currentPosLoader.data }),
    })
      .then(async (res) => {
        const body = await res.json();
        if (res.status !== 200) throw Error(body);
        setReport((prevState) => ({ ...prevState, ...body }));
        setStatus("SUCCESS");
      })
      .catch((err) => {
        setStatus("ERROR");
        console.error(err.message);
      });
  };

  switch (status) {
    case "IDLE":
    case "SUCCESS":
      return (
        <div className="new_report">
          <DialogCreateReportSuccess
            open={status === "SUCCESS"}
            handleClose={() => setStatus("RETURN")}
          />
          <Link to="/">
            <Button size="small" startIcon={<ArrowBackIcon />}>
              Back
            </Button>
          </Link>
          <Typography variant="h3" mb={2} fontFamily="SourceSerif4">
            New Report
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <Stack spacing={2}>
              <TextField
                id="reporter"
                label="Reporter's name"
                value={report.reporter}
                onChange={onChange}
                fullWidth
              />
              <TextField
                id="civicNumber"
                label="Civic number"
                value={report.civicNumber}
                onChange={onChange}
                fullWidth
              />
              <TextField
                id="streetName"
                label="Streen Name"
                value={report.streetName}
                onChange={onChange}
                fullWidth
                disabled
              />
              <TextField
                id="neighborhood"
                label="Neighborhood"
                value={report.neighborhood}
                onChange={onChange}
                fullWidth
                disabled
              />
              <TextField
                id="lotColor"
                label="Parking lot color"
                select
                value={report.lotColor}
                onChange={onChange}
                fullWidth
              >
                {lotColorOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="notes"
                label="Notes"
                value={report.notes}
                onChange={onChange}
                fullWidth
                multiline
                rows={4}
              />
              <Button type="submit" variant="contained" fullWidth size="large">
                Confirm
              </Button>
            </Stack>
          </Box>
        </div>
      );
    case "RETURN":
      return <Navigate to="/" />;
    case "ERROR":
      return <Navigate to="/error" />;
    default:
      return <CenteredSpinner />;
  }
};

export default NewReport;
