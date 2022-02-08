import { useCallback, useEffect, useState } from "react";
import { API_BASE_PATH } from "../config/consts";
import { ILoader, IReport, TLoaderStatus } from "../types";

export const useLoadReports = (): ILoader<Array<IReport>> => {
  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState<TLoaderStatus>("IDLE");

  const reset = useCallback(() => {
    setReports([]);
    setStatus("IDLE");
  }, []);

  useEffect(() => {
    if (status === "IDLE") {
      setStatus("LOADING");
      fetch(`${API_BASE_PATH}/reports`)
        .then(async (res) => {
          const body = await res.json();
          if (res.status !== 200) throw Error(body);
          setStatus("READY");
          setReports(body);
        })
        .catch((err) => {
          setStatus("ERROR");
          console.error(err.message);
        });
    }
  }, [status]);

  return { data: reports, status, reset };
};
