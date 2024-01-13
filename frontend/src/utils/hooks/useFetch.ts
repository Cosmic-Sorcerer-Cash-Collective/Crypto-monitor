import { useEffect, useState } from "react";

export function useFetch(
  url: string,
  method: "POST" | "GET" | "PUT" | "DELETE" = "POST",
  body: unknown = {},
  header: HeadersInit | undefined = {
    "Content-Type": "application/json",
  }
) {
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foo = async () => {
      await fetch(url, {
        method: method,
        headers: header,
        body: method === "GET" ? undefined : JSON.stringify(body),
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
      foo();
    }
  }, [values]);
  return { values, loading, error };
}
