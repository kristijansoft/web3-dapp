import axios from "axios";
import { useCallback, useRef, useState } from "react";

export function useGeneratePortfolio({ walletAddress, riskScore }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [portfolio, setPortfolio] = useState(null);

  const sourceRef = useRef(axios.CancelToken.source());

  const generatePortfolio = useCallback(
    (onSettled = () => {}) => {
      setIsLoading(true);
      setError("");

      axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/analysis/portfolio/${
            walletAddress ? walletAddress : "undefined"
          }`,
          {
            risk_score: riskScore,
          },
          {
            cancelToken: sourceRef.current.token,
          }
        )
        .then((response) => {
          setIsLoading(false);
          setPortfolio(response.data);
          onSettled();
        })
        .catch((error) => {
          if (axios.isCancel(error)) return;
          setIsLoading(false);
          setError("Error");
          onSettled();
        });
    },
    [riskScore, walletAddress]
  );

  const resetPortfolio = useCallback(() => {
    setIsLoading(false);
    setPortfolio(null);
    setError("");
  }, []);

  const cancel = useCallback(() => {
    sourceRef.current.cancel();
  }, []);

  return {
    isLoading,
    portfolio,
    error,
    generatePortfolio,
    resetPortfolio,
    cancel,
  };
}
