import { useState, useEffect } from "react";

type EventDataType = {
  images: string[];
  title: string;
} | null;

const useMemoryApi = (url: string) => {
  const [data, setData] = useState<EventDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData({
          images: [
            jsonData.events[0].images[0].url,
            jsonData.events[0].images[1].url,
            jsonData.events[0].images[2].url,
          ],
          title: jsonData.events[0].name,
        });
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useMemoryApi;
