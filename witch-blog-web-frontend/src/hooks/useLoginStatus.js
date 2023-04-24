import { useState, useEffect } from "react";

const useLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const getLoginStatus = () => {
      if (localStorage.getItem("token")) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    };
    getLoginStatus();
  });
  return isLoggedIn;
};

export default useLoginStatus;
