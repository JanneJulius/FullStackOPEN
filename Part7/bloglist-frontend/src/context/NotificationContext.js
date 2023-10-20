import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  message: null,
  type: "info",
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { message: action.message, type: action.notificationType };
    case "CLEAR_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
