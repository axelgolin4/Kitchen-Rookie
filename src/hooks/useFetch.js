import { useEffect, useState } from "react";

function useFetch(url) {
  const [state, setState] = useState({ url: null, data: null, error: null });

  useEffect(() => {
    let ignore = false;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!ignore) setState({ url, data, error: null });
      })
      .catch((err) => {
        if (!ignore) setState({ url, data: null, error: err.message });
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  const loading = state.url !== url;

  return {
    data: loading ? null : state.data,
    error: loading ? null : state.error,
    loading,
  };
}

export default useFetch;