import React from "react";
import "./styles.css";
import cookie from "cookie";
import { Grommet, Grid, Box, Text, Button, Layer } from "grommet";

import CommandForm from "Command/Form";
import SessionForm from "Session/Form";
import NotificationProvider from "Notification/Provider";
import { QueryClient, QueryClientProvider } from "react-query";
export default function App() {
  const [hasSession, setHasSession] = React.useState(false);

  const onSessionStart = () => {
    setHasSession(true);
  };

  const onSessionEnd = () => {
    setHasSession(false);
  };

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
            {hasSession ? (
              <CommandForm />
            ) : (
              <SessionForm onSessionStart={onSessionStart} />
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
