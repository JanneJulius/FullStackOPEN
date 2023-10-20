import React, { useEffect } from "react";
import { useNotification } from "../context/NotificationContext";
import styled from "styled-components";

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  &.show {
    opacity: 1;
  }
`;

function Notification() {
  const { state, dispatch } = useNotification();

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.message, dispatch]);

  return (
    <NotificationContainer
      className={`notification ${state.type} ${state.message ? "show" : ""}`}
    >
      {state.message}
    </NotificationContainer>
  );
}

export default Notification;
