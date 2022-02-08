import OLTileLayer from "ol/layer/Tile";
import { FC, useContext, useEffect } from "react";
import { MapContext } from "./Map";

interface IProps {
  source: any;
  zIndex: number;
}

const TileLayer: FC<IProps> = ({ source, zIndex = 0 }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const tileLayer = new OLTileLayer({
      source,
      zIndex,
    });

    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map, source, zIndex]);

  return null;
};

export default TileLayer;
