import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import {
  Alert,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { API_BASE_PATH } from "../config/consts";
import { useLoadCurrentPos } from "../hooks/useLoadCurrentPos";
import { useLoadReport } from "../hooks/useLoadReport";
import { TActivityStatus } from "../types";
import { CenteredSpinner } from "./CenteredSpinner";
import { DialogDeactivateReportFail } from "./DialogDeactivateReportFail";
import { DialogDeactivateReportSuccess } from "./DialogDeactivateReportSuccess";

type TReportDetailsStatus = TActivityStatus | "REPORT_DEACTIVATION_FAILED";

const ReportDetails = () => {
  const { id } = useParams();
  const [status, setStatus] = useState<TReportDetailsStatus>("IDLE");
  const report = useLoadReport(id);
  const currentPosLoader = useLoadCurrentPos();

  const handleSubmit = () => {
    if (currentPosLoader.data) {
      setStatus("LOADING");
      fetch(`${API_BASE_PATH}/reports/deactivate/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentPosLoader.data),
      })
        .then(async (res) => {
          const body = await res.json();
          if (res.status !== 200) throw Error(body);
          setStatus("SUCCESS");
        })
        .catch((err) => {
          setStatus("REPORT_DEACTIVATION_FAILED");
        });
    }
  };

  useEffect(() => {
    if (report.status === "LOADING") {
      setStatus("LOADING");
    } else if (report.status === "READY") {
      setStatus("IDLE");
    } else if (report.status === "ERROR") {
      setStatus("ERROR");
    }
  }, [report.status]);

  const formattedCreatedAt = useMemo(() => {
    if (report.data?.createdAt) {
      const date = new Date(report.data.createdAt);
      const dateString = date.toLocaleDateString();
      const timeString = date.toLocaleTimeString();
      return `${dateString}, ${timeString}`;
    }
  }, [report.data?.createdAt]);

  switch (status) {
    case "IDLE":
    case "SUCCESS":
    case "REPORT_DEACTIVATION_FAILED":
      return (
        <div className="report_details">
          <DialogDeactivateReportSuccess
            open={status === "SUCCESS"}
            handleClose={() => setStatus("RETURN")}
          />
          <DialogDeactivateReportFail
            open={status === "REPORT_DEACTIVATION_FAILED"}
            handleClose={() => setStatus("IDLE")}
          />
          <Link to="/">
            <Button size="small" startIcon={<ArrowBackIcon />}>
              Back
            </Button>
          </Link>
          <Typography variant="h3" mb={2} fontFamily="SourceSerif4">
            Report Details
          </Typography>
          {/* <h1>Report Details</h1> */}
          {report?.data?.isActive ? (
            <Alert variant="outlined" severity="success">
              This report is still valid
            </Alert>
          ) : (
            <Alert variant="outlined" severity="error">
              This report is no longer valid
            </Alert>
          )}
          <List>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText
                primary="Address:"
                secondary={`${report?.data?.streetName}, ${report?.data?.civicNumber}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationCityIcon />
              </ListItemIcon>
              <ListItemText
                primary="Neighborhood"
                secondary={report?.data?.neighborhood}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary="Reporter: "
                secondary={report?.data?.reporter}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Created at:"
                secondary={formattedCreatedAt}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ColorLensIcon />
              </ListItemIcon>
              <ListItemText
                primary="Color:"
                secondary={report?.data?.lotColor}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TextSnippetIcon />
              </ListItemIcon>
              <ListItemText primary="Notes:" secondary={report?.data?.notes} />
            </ListItem>
          </List>
          {report.data?.isActive && (
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmit}
            >
              Mark as occupied
            </Button>
          )}
        </div>
      );
    case "ERROR":
      return <Navigate to="/error" />;
    case "RETURN":
      return <Navigate to="/" />;
    case "LOADING":
    default:
      return <CenteredSpinner />;
  }
};

export default ReportDetails;
