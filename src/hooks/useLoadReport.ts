import { useEffect, useState } from "react";
import { API_BASE_PATH } from "../config/consts";
import { ILoader, IReport, TLoaderStatus } from "../types";

export const useLoadReport = (
  id: string | undefined
): ILoader<IReport | undefined> => {
  const [report, setReport] = useState<IReport | undefined>();
  const [status, setStatus] = useState<TLoaderStatus>("IDLE");

  useEffect(() => {
    if (id) {
      setStatus("LOADING");
      fetch(`${API_BASE_PATH}/reports/${id}`)
        .then(async (res) => {
          const body = await res.json();
          if (res.status !== 200) throw Error(body);
          setStatus("READY");
          setReport(body);
        })
        .catch((err) => {
          setStatus("ERROR");
          console.error(err.message);
        });
    }
  }, [id]);

  return { data: report, status };
};
