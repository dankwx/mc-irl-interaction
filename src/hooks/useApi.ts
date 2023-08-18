import { useState, useEffect } from "react";

type DataType = {
  message: string;
};

export function useFetchData(url: string): DataType | null {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);

  return data;
}
