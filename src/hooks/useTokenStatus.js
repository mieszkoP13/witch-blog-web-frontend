import { useState, useEffect } from "react";

const useTokenStatus = () => {
  const [isToken, setIsToken] = useState(false);
  useEffect(() => {
    const getLoginStatus = () => {
      if (localStorage.getItem("token")) setIsToken(true);
      else setIsToken(false);
    };
    getLoginStatus();
  });
  return isToken;
};

export default useTokenStatus;
