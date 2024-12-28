import { useState, useCallback } from "react";

/**
 * 自定义防抖 Hook 用于按钮点击
 * @param {Function} callback - 被防抖的回调函数
 * @param {number} delay - 防抖的延迟时间（毫秒）
 * @returns {Function} 防抖后的回调函数
 */
const useDebounce = (callback, delay = 500) => {
  const [isReady, setIsReady] = useState(true);

  const debouncedCallback = useCallback(() => {
    if (!isReady) return;

    callback();
    setIsReady(false);

    // 设置延时后恢复执行
    setTimeout(() => {
      setIsReady(true);
    }, delay);
  }, [callback, isReady, delay]);

  return debouncedCallback;
};

export default useDebounce;
