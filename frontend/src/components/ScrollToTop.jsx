// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();  // Get the current route path

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to top whenever the path changes
  }, [pathname]);  // Run this effect when the route changes

  return null;  // This component doesn't render anything
};

export default ScrollToTop;
