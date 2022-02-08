import React, { createContext, FC, useEffect, useRef, useState } from "react";
import * as ol from "ol";

interface IProps {
  zoom: number;
  center: any;
  onMarkerClick: (id: string) => void;
}

interface IMapContext {
  map: ol.Map | null;
}

export const MapContext = createContext({} as IMapContext);

const Map: FC<IProps> = ({ children, zoom, center, onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<ol.Map | null>(null);

  useEffect(() => {
    const options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };

    const mapObject = new ol.Map(options);
    if (mapRef.current) {
      mapObject.setTarget(mapRef.current);
    }
    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, [center, zoom]);

  useEffect(() => {
    if (!map) return;

    map.on("click", function (evt) {
      var feature = map.forEachFeatureAtPixel(
        evt.pixel,
        function (feat, layer) {
          return feat;
        }
      );

      if (feature && feature.get("type") === "marker") {
        const id = feature.get("id");
        onMarkerClick(id);
      }
    });
  }, [map, onMarkerClick]);

  useEffect(() => {
    if (!map) return;

    map.getView().setZoom(zoom);
  }, [map, zoom]);

  useEffect(() => {
    if (!map) return;

    map.getView().setCenter(center);
  }, [center, map]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
