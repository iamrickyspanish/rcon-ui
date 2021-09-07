import React from "react";
import "./styles.css";
import { Grommet, Grid, Box, Text, Button, Layer, Spinner } from "grommet";

import CommandPage from "Command/Page";
import SessionForm from "Session/Form";
import NotificationProvider from "Notification/Provider";
import { QueryClient, QueryClientProvider } from "react-query";
import api from "./api";

export default function App() {
  const [hasSession, setHasSession] = React.useState(false);
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
        console.log("r", r);
        setHasSession(!!r);
      } catch (e) {
        console.log("catch, set session false");
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
          }
        }}
        full
        style={{ overflow: "hidden" }}
        overflow="hidden"
      >
        <NotificationProvider>
          <Grid fill rows={["auto", "flex", "auto"]} overflow="hidden">
            <Box
              height={{ min: "auto" }}
              pad="medium"
              align="center"
              direction="row"
              background="brand"
              gap="small"
              margin={{ bottom: "medium" }}
            >
              RCON PANEL
              {hasSession && <Button label="logout" onClick={onSessionEnd} />}
            </Box>
            {isReady ? (
              hasSession ? (
                <CommandPage />
              ) : (
                <SessionForm onSessionStart={onSessionStart} />
              )
            ) : (
              <Box align="center" justify="center">
                <Spinner size="xlarge" />
              </Box>
            )}
            <Box
              background="brand"
              pad={{ horizontal: "medium", vertical: "small" }}
              height={{ min: "auto" }}
            >
              <Text size="small">footer</Text>
            </Box>
          </Grid>
        </NotificationProvider>
      </Grommet>
    </QueryClientProvider>
  );
}
