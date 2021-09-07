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
import { Terminal, Chat } from "grommet-icons";
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

  const ref = React.useRef();

  const [activeBottomTab, setActiveBottomTab] = React.useState(null);

  const isReady = data && !isLoading;

  const showConsole = React.useCallback(() => {
    setActiveBottomTab("console");
  }, [activeBottomTab]);

  const showSay = React.useCallback(() => {
    setActiveBottomTab("say");
  }, [activeBottomTab]);

  const onLayerClose = React.useCallback(() => {
    setActiveBottomTab(null);
  }, []);

  return isReady ? (
    <>
      <Grid rows={["flex", "auto", "auto"]}>
        <Box ref={ref}>
          <StatusMonitor initialStatus={data.data} />
        </Box>
        {/* <Box pad="medium">
          <SayForm />
        </Box> */}
        <Box
          pad={{ horizontal: "medium", vertical: "xsmall" }}
          align="center"
          direction="row"
          justify="around"
        >
          <Button
            plain
            icon={<Terminal size="small" />}
            onClick={showConsole}
            label="console"
          />
          <Button
            plain
            icon={<Chat size="small" />}
            onClick={showSay}
            label="say"
          />
        </Box>
      </Grid>
      {activeBottomTab && (
        <Layer
          position="bottom"
          full="horizontal"
          modal={false}
          onClickOutside={onLayerClose}
          onEsc={onLayerClose}
          target={ref.current}
          animation="fadeIn"
          responsive={false}
        >
          <Box fill="horizontal" pad="medium" border="top">
            {activeBottomTab == "console" && <RawForm />}
            {activeBottomTab == "say" && <SayForm />}
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
