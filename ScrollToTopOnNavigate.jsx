import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTopOnNavigate() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 200);
  }, [location.pathname]); // Trigger when pathname changes

  return null; // This component doesn’t render anything
}

export default ScrollToTopOnNavigate;
