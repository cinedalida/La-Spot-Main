import { useState, useEffect } from "react";
import "../css/ScrollUp.css";

export function ScrollUp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY >= 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="#"
      className={`scrollup ${isVisible ? "show-scroll" : ""}`}
      id="scroll-up"
    >
      <i className="ri-arrow-up-line"></i>
    </a>
  );
}
