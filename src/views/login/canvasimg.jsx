import React, { useRef, useEffect } from "react";

const CanvasWithImage = ({ base64Image }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.src = base64Image; // This will load the image into the canvas
  }, [base64Image]);

  return <canvas ref={canvasRef} />;
};

export default CanvasWithImage;
