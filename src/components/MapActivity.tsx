import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { fromLonLat } from "ol/proj";
import * as olSource from "ol/source";
import VectorSource from "ol/source/Vector";
import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLoadCurrentPos } from "../hooks/useLoadCurrentPos";
import { useLoadReports } from "../hooks/useLoadReports";
import currentPosIcon from "../assets/icons/currentPosIcon.svg";
import { TActivityStatus } from "../types";
import { constructMarkers } from "../utils/constructMarkers";
import { generatePoint } from "../utils/generatePoint";
import { CenteredSpinner } from "./CenteredSpinner";
import Layers from "./Layers";
import Map from "./Map";
import TileLayer from "./TileLayer";
import VectorLayer from "./VectorLayer";
import { AppBar } from "./AppBar";

const MapActivity = () => {
  const currentPos = useLoadCurrentPos();
  const reports = useLoadReports();

  const [status, setStatus] = useState<TActivityStatus>("IDLE");

  const navigate = useNavigate();
  const onMarkerClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  const source = useMemo(
    () =>
      new VectorSource({
        features: constructMarkers(reports.data),
      }),
    [reports.data]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      source.clear();
      source.addFeatures(constructMarkers(reports.data));
    }, 60000);

    return () => clearInterval(interval);
  }, [source, reports.data]);

  useEffect(() => {
    if (currentPos.status === "LOADING" || reports.status === "LOADING") {
      setStatus("LOADING");
    } else if (currentPos.status === "READY" && reports.status === "READY") {
      setStatus("IDLE");
    } else if (currentPos.status === "ERROR" && reports.status === "ERROR") {
      setStatus("ERROR");
    }
  }, [currentPos.status, reports.status]);

  switch (status) {
    case "IDLE":
      return (
        <>
          <AppBar onRefresh={reports.reset} />
          <Map
            center={fromLonLat([
              currentPos.data?.lng || 0,
              currentPos.data?.lat || 0,
            ])}
            zoom={14}
            onMarkerClick={onMarkerClick}
          >
            <Layers>
              <TileLayer source={new olSource.OSM()} zIndex={0} />
              {/* <VectorLayer
                source={
                  new VectorSource({
                    features: new GeoJSON().readFeatures(mapConfig.geojsonObject, {
                      featureProjection: get("EPSG:3857"),
                    }),
                  })
                }
                style={FeatureStyles.MultiPolygon}
              /> */}
              <VectorLayer source={source} />
              {currentPos.status === "READY" && (
                <VectorLayer
                  source={
                    new VectorSource({
                      features: [
                        generatePoint(
                          {
                            lat: currentPos.data?.lat || 0,
                            lng: currentPos.data?.lng || 0,
                          },
                          currentPosIcon,
                          "current_pos",
                          {
                            scale: 0.05,
                          }
                        ),
                      ],
                    })
                  }
                />
              )}
            </Layers>
          </Map>
          <Link to="/new">
            <Fab
              sx={{
                position: "fixed",
                bottom: "50px",
                right: "50px",
              }}
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </Link>
        </>
      );
    case "ERROR":
      return <Navigate to="/error" />;
    default:
      return <CenteredSpinner />;
  }
};

export default MapActivity;
