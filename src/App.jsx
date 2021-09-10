import React from "react";
import "./styles.css";
import { Grommet } from "grommet";
import CommandPage from "Command/Page";
import SessionForm from "Session/Form";
import NotificationProvider from "Notification/Provider";
import { QueryClient, QueryClientProvider } from "react-query";
import api from "./api";
import LoadingPlaceholder from "Placeholder/Loading";

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

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Grommet
        theme={{
          global: {
            font: {
              family: "sans"
            }
            // elevation: {
            //   smallReversed: "0px 2px 4px rgba(100, 100, 100, 0.50)"
            // }
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
              <CommandPage onSeccionEnd={onSessionEnd} />
            ) : (
              <SessionForm onSessionStart={onSessionStart} />
            )
          ) : (
            <LoadingPlaceholder />
          )}
        </NotificationProvider>
      </Grommet>
    </QueryClientProvider>
  );
};
