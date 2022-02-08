import OLVectorLayer from "ol/layer/Vector";
import { FC, useContext, useEffect } from "react";
import { MapContext } from "./Map";

interface IProps {
  source: any;
  style?: any;
  zIndex?: number;
}

const VectorLayer: FC<IProps> = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const vectorLayer = new OLVectorLayer({
      source,
      style,
    });

    const _source = vectorLayer.getSource();
    _source.changed(); // TODO: maybe I can delete it

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map, source, style, zIndex]);

  return null;
};

export default VectorLayer;
