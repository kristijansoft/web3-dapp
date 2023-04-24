import axios from "axios";
import html2canvas from "html2canvas";
import { useCallback, useState } from "react";

export function useTwitterShare() {
  const [isLoading, setIsLoading] = useState(false);

  const twitterShare = useCallback(
    ({
      captureDOM,
      analysis,
      tweetText,
      beforeCapture = () => {},
      afterCapture = () => {},
    } = {}) => {
      setIsLoading(true);
      setTimeout(() => {
        beforeCapture();
        html2canvas(captureDOM)
          .then((canvas) => {
            afterCapture();
            const originalImgData = canvas.toDataURL();
            canvas.height = Math.max(canvas.height, canvas.width / 1.91);
            canvas.width = Math.max(canvas.width, canvas.height * 1.91);
            const img = new Image();
            img.onload = function () {
              canvas
                .getContext("2d")
                .drawImage(
                  img,
                  (canvas.width - img.width) / 2,
                  (canvas.height - img.height) / 2
                );
              const imgData = canvas.toDataURL();
              axios
                .post(`${process.env.REACT_APP_API_ENDPOINT}/image/upload`, {
                  image: imgData,
                  risk_score: analysis.risk_score,
                  avg_yield: analysis.avg_yield,
                })
                .then((response) => {
                  const tweetImageUrl = `https://defi.oneclick.fi/i/${response.data}`;
                  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    tweetText
                  )}&url=${encodeURIComponent(tweetImageUrl)}`;
                  window.open(tweetUrl, "Share Twitter", "popup");
                  setIsLoading(false);
                });
            };
            img.src = originalImgData;
          })
          .catch((e) => {
            console.log(e.message);
            setIsLoading(false);
          });
      }, 0);
    },
    []
  );

  return { isLoading, twitterShare };
}
