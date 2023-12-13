import { useEffect, useState } from "react";

export function useFetch(
  url: string,
  body: Object = {},
  method: "POST" | "GET" | "PUT" | "DELETE" = "POST",
  header: HeadersInit | undefined = {
    "Content-Type": "application/json",
  }
) {
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const useFetch = async () => {
      await fetch(url, {
        method: method,
        headers: header,
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          setValues(data);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (!values) {
      useFetch();
    }
  }, [values]);
  return { values, loading, error };
}
