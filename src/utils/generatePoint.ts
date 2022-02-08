import { Feature } from "ol";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Fill, Icon, Stroke, Style, Text } from "ol/style";
import { ICoordinates } from "../types";
import { resolveTimestamp } from "./resolveTimestamp";

export const generatePoint = (
  pos: ICoordinates,
  src: string,
  type: "marker" | "current_pos",
  options?: {
    id?: string;
    createdAt?: string;
    color?: string;
    scale?: number;
  }
): Feature<Point> => {
  const text = options?.createdAt && resolveTimestamp(options.createdAt);
  const feature = new Feature({
    geometry: new Point(fromLonLat([pos.lng, pos.lat])),
    type,
    id: options?.id,
  });
  feature.setStyle(
    new Style({
      image: new Icon({
        // color: options?.color,
        scale: options?.scale,
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src,
      }),
      text: new Text({
        font: "12px Calibri,sans-serif",
        fill: new Fill({ color: "#000" }),
        stroke: new Stroke({
          color: "#fff",
          width: 2,
        }),
        text,
      }),
    })
  );
  return feature;
};
