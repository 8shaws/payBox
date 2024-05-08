import React from "react";
import Turnstile from "react-turnstile";
import { SITEKEY } from "../lib/config";

const Captcha = ({
  setIsLoading,
  setToken,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Turnstile
      sitekey={SITEKEY}
      fixedSize={false}
      size="normal"
      theme="auto"
      className="dave"
      onLoad={(id) => {
        setIsLoading(true);
      }}
      onVerify={(token) => {
        setToken(token);
        setIsLoading(false);
      }}
      retry="auto"
      appearance="always"
    />
  );
};

export default Captcha;
