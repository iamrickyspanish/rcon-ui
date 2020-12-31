import React from "react";
import "./styles.css";
import cookie from "cookie";
import { Grommet, Box, Text } from "grommet";

import CommandForm from "Command/Form";
import SessionForm from "Session/Form";

export default function App() {
  const cookies = cookie.parse(document.cookie);
  console.log("cookies", cookies);
  const hasSession = !!cookies.rcon_session_id?.length;

  return (
    <Grommet
      theme={{
        global: {
          font: {
            family: "sans"
          }
        }
      }}
      full
    >
      <Box fill>
        <Box pad="medium" background="brand">
          HEADER{" "}
        </Box>
        <Box fill pad="medium" style={{ overflow: "auto" }}>
          {hasSession ? <CommandForm /> : <SessionForm />}
        </Box>
        <Box
          background="brand"
          pad={{ horizontal: "medium", vertical: "small" }}
        >
          <Text size="small">footer</Text>
        </Box>
      </Box>
    </Grommet>
  );
}
