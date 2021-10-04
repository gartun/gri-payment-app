import { useState } from "react";

const useToken = () => {
  const [token, setToken] = useState(getToken());

  function getToken() {
    const val = document.cookie
      .split(";")
      .find((row) => row.startsWith("access-token="))
      ?.split("=")[1];

    return val;
  }

  function setTokens(accessToken, maxAge, refreshToken) {
    document.cookie = `access-token=${accessToken};max-age=${maxAge};secure;`;
    document.cookie = `refresh-token=${refreshToken};max-age=${maxAge};secure;`;

    setToken(accessToken);
  }

  function deleteTokens() {
    const zero = "Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = `access-token=;expires=${zero};secure;`;
    document.cookie = `refresh-token=;expires=${zero};secure;`;

    setToken(undefined);
  }

  return {
    setTokens,
    deleteTokens,
    token,
  };
};

export default useToken;
