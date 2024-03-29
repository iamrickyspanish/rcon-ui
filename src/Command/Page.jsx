import React from "react";
import { Box, Button, Layer } from "grommet";
import { Terminal, Chat, Power } from "grommet-icons";
import { useMutation } from "react-query";
import { command } from "./api";
import StatusMonitor from "./StatusMonitor";
import SayForm from "./SayForm";
import RawForm from "./RawForm";
import PageLayout from "Layout/Page";
import LoadingPlaceholder from "Placeholder/Loading";

const CommandForm = (props) => {
  const { data, isLoading, mutate } = useMutation(command);
  React.useEffect(() => {
    mutate("status");
  }, []);

  const ref = React.useRef();

  const [activeBottomTab, setActiveBottomTab] = React.useState(null);

  const isReady = true; //data && !isLoading;

  const showConsole = React.useCallback(
    (e) => {
      activeBottomTab !== "console" && setActiveBottomTab("console");
    },
    [activeBottomTab]
  );

  const showSay = React.useCallback(
    (e) => {
      activeBottomTab !== "say" && setActiveBottomTab("say");
    },
    [activeBottomTab]
  );

  const onLayerClose = React.useCallback(() => {
    setTimeout(() => setActiveBottomTab(null), 0);
  }, []);

  return isReady ? (
    <>
      <PageLayout
        plainMain
        plainFooter
        header={
          <Box
            fill="horizontal"
            direction="row"
            align="center"
            justify="between"
          >
            Dashboard
            <Power onClick={props.onSessionEnd} />
          </Box>
        }
        main={
          <Box ref={ref} fill>
            <StatusMonitor
            // initialStatus={data.data}
            />
          </Box>
        }
        footer={
          <>
            <Box
              background={activeBottomTab === "console" ? "white" : "brand"}
              fill="horizontal"
              height="xxsmall"
            >
              <Button
                plain
                icon={<Terminal size="small" />}
                onClick={showConsole}
                label="console"
                hoverIndicator
                fill
              />
            </Box>
            <Box
              height="xxsmall"
              background={activeBottomTab === "say" ? "white" : "brand"}
              fill="horizontal"
            >
              <Button
                plain
                icon={<Chat size="small" />}
                onClick={showSay}
                label="say"
                hoverIndicator
                fill
              />
            </Box>
          </>
        }
      />
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
    <LoadingPlaceholder />
  );
};

export default CommandForm;
