import { useState, useCallback } from "react";

const getProducts = (data) => {
  try {
    let transformedData = [];
    for (let key in data) {
      transformedData.push(data[key]);
    }

    for (let item of transformedData) {  
      item.price = parseFloat(item.price);
      item.score = parseInt(item.score);
    }

    return transformedData;
  } catch (err) {
    console.error(err.message);
  }
};

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      });

      if (!response.ok) {
        throw new Error(`Błąd ${response.status}`);
      }

      const data = await response.json();

      setResult(getProducts(data));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    result
  };
};

export default useHttp;
