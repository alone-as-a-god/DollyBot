import { useEffect, useRef } from "react";
export const useClickOutside = (handler) => {
  let ref = useRef();
  useEffect(() => {
    const clickHandler = (event) => {
      if (!ref.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", clickHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  });
  return ref;
};
