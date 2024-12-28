import React, { useRef, useEffect } from "react";

const CanvasWithImage = ({ base64Image }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // 获取父容器的宽高
      const containerWidth = canvas.parentElement.offsetWidth;
      const containerHeight = canvas.parentElement.offsetHeight;

      // 设置 canvas 实际的画布大小，确保渲染像素不失真
      canvas.width = containerWidth;
      canvas.height = containerHeight;

      // 计算图像的缩放比例，确保图像填充父容器
      const scaleX = canvas.width / img.width;
      const scaleY = canvas.height / img.height;
      const scale = Math.max(scaleX, scaleY); // 保持比例，使用更大的缩放比例

      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      // 在 canvas 中清除内容并绘制背景色
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空 canvas 内容
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制图像，确保它完全填充 canvas 并保持比例
      const offsetX = (canvas.width - scaledWidth) / 2;
      const offsetY = (canvas.height - scaledHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
    };

    img.src = base64Image; // 加载 base64 图像
  }, [base64Image]); // 当 base64Image 更新时重新加载图像

  return (
    <div style={{ width: "100%", height: "2.5rem", position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default CanvasWithImage;
