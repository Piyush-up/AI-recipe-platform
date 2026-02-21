import { useState } from "react";
import { toast } from "sonner";

function useFetch(cb) {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fn, setData };
}

export default useFetch;
