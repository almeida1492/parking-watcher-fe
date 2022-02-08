import markerIcon from "../assets/icons/markerIcon.svg";
import { IReport } from "../types";
import { generatePoint } from "./generatePoint";

export const constructMarkers = (reports: Array<IReport>) => {
  const features = reports.map((report) => {
    return generatePoint(
      { lat: report.lat, lng: report.lng },
      markerIcon,
      "marker",
      {
        id: report.id,
        createdAt: report.createdAt,
        scale: 0.07,
      }
    );
  });

  return features;
};
