import { useEffect, useState } from "react";
import { ICoordinates, ILoader, TLoaderStatus } from "../types";

export const useLoadCurrentPos = (): ILoader<ICoordinates | undefined> => {
  const [currentPos, setCurrentPos] = useState<ICoordinates>();
  const [status, setStatus] = useState<TLoaderStatus>("IDLE");

  useEffect(() => {
    setStatus("LOADING");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setStatus("READY");
      },
      (err) => {
        console.error(err);
        setStatus("ERROR");
      }
    );
  }, []);

  return { data: currentPos, status };
};
