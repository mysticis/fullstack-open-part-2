import React from "react";

const phoneBookNotification = ({ message, errorStatus }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className={errorStatus ? "error" : "notification"}>{message}</div>
  );
};
export default phoneBookNotification;
