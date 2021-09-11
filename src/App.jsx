import React from "react";
import "./styles.css";
import { Grommet } from "grommet";
import CommandPage from "Command/Page";
import SessionForm from "Session/Form";
import NotificationProvider from "Notification/Provider";
import { QueryClient, QueryClientProvider } from "react-query";
import api from "./api";
import LoadingPlaceholder from "Placeholder/Loading";

const AppContext = React.createContext();

export const useApp = () => React.useContext(AppContext);

export default () => {
  const [hasSession, setHasSession] = React.useState(true);
  const [isReady, setReady] = React.useState(false);

  const onSessionStart = () => {
    setHasSession(true);
  };

  const onSessionEnd = () => {
    setHasSession(false);
  };

  React.useEffect(() => {
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (401 === error.response.status) {
          console.log("axios interceptor, set session false");
          setHasSession(false);
        } else {
          return Promise.reject(error);
        }
      }
    );
    (async () => {
      try {
        const r = await api.get("/");
        setHasSession(!!r);
      } catch (e) {
        setHasSession(false);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const ctx = {
    startSession: onSessionStart,
    endSession: onSessionEnd
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={ctx}>
        <Grommet
          theme={{
            global: {
              font: {
                family: "sans"
              }
            },
            button: {
              border: {
                radius: 0
              }
            }
          }}
          full
        >
          <NotificationProvider>
            {isReady ? (
              hasSession ? (
                <CommandPage onSessionEnd={onSessionEnd} />
              ) : (
                <SessionForm onSessionStart={onSessionStart} />
              )
            ) : (
              <LoadingPlaceholder />
            )}
          </NotificationProvider>
        </Grommet>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};
