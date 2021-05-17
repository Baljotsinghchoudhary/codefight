import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const useScrollTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
};

export default useScrollTop;
