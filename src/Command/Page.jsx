import React, { useEffect } from "react";
import {
  Box,
  Form,
  FormField,
  TextInput,
  Button,
  Grid,
  Spinner,
  Layer
} from "grommet";
import { Terminal } from "grommet-icons";
import { useMutation } from "react-query";
import { command } from "./api";
import StatusMonitor from "./StatusMonitor";
import SayForm from "./SayForm";
import RawForm from "./RawForm";
const CommandForm = () => {
  const { data, isSuccess, isError, isLoading, mutate, error } =
    useMutation(command);
  React.useEffect(() => {
    mutate("status");
  }, []);

  const [isConsoleActive, setConsoleActive] = React.useState(false);

  const isReady = data && !isLoading;

  // const [values, setValues] = React.useState({ message: "" });

  const toggleConsoleActive = React.useCallback(() => {
    setConsoleActive(!isConsoleActive);
  }, [isConsoleActive]);

  return isReady ? (
    <>
      <Grid rows={["flex", "auto", "auto"]}>
        <StatusMonitor initialStatus={data.data} />
        <Box pad="medium">
          <SayForm />
        </Box>
        <Box
          pad={{ horizontal: "medium", vertical: "xsmall" }}
          justify="center"
        >
          <Button
            plain
            icon={<Terminal size="small" />}
            onClick={toggleConsoleActive}
            label="console"
          />
        </Box>
      </Grid>
      {isConsoleActive && (
        <Layer
          position="top"
          full="horizontal"
          modal
          onClickOutside={toggleConsoleActive}
          onEsc={toggleConsoleActive}
        >
          <Box fill="horizontal" overflow="auto" height="medium" pad="medium">
            <RawForm />
          </Box>
        </Layer>
      )}
    </>
  ) : (
    <Box full align="center" justify="center">
      <Spinner size="xlarge" />
    </Box>
  );
};

export default CommandForm;
