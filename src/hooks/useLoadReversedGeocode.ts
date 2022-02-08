import { useEffect, useState } from "react";
import { REVERSE_GEOCODE_SERVICE_URL } from "../config/consts";
import { ICoordinates, ILoader, IReport, TLoaderStatus } from "../types";

type TReversedGeocode =
  | Omit<
      IReport,
      "id" | "reporter" | "createdAt" | "lotColor" | "isActive" | "lat" | "lng"
    >
  | undefined;

export const useLoadReversedGeocode = (
  pos: ICoordinates | undefined
): ILoader<TReversedGeocode> => {
  const [reversedGeocode, setReversedGeocode] = useState<TReversedGeocode>();
  const [status, setStatus] = useState<TLoaderStatus>("IDLE");

  useEffect(() => {
    if (pos) {
      setStatus("LOADING");
      fetch(`${REVERSE_GEOCODE_SERVICE_URL}&lon=${pos.lng}&lat=${pos.lat}`)
        .then(async (response) => {
          const body = await response.json();
          if (response.status !== 200) throw Error(body);
          const addressElements = body.display_name.split(",");
          setReversedGeocode({
            civicNumber: addressElements[0],
            streetName: addressElements[1],
            neighborhood: addressElements[2],
          });
          setStatus("READY");
        })
        .catch((err) => {
          setStatus("ERROR");
          console.error(err.message);
        });
    }
  }, [pos]);

  return { data: reversedGeocode, status };
};
