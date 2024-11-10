import { useState, useEffect } from "react";
import axios from "axios";

type Props = {
  country: string;
  language: string;
  category: string;
  size: number;
};

function useFetch({ country, language, category, size }: Props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=${country}&language=${language}&category=${category}&image=1&removeduplicate=1&size=${size}`;
      const response = await axios.get(url);

      if (response && response.data) {
        setData(response.data.results);
      }
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
    setIsLoading(false);
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}

export default useFetch;
