import React from "react";

import { Grid, Box, Spinner } from "grommet";
import { command } from "./api";
import { useMutation } from "react-query";
// import use from "Notification/use";

const StatusMonitor = (props) => {
  const { data, mutate, isLoading, isSuccess, isError } = useMutation(() =>
    command("status")
  );
  const [status, setStatus] = React.useState(props.initialStatus);
  React.useEffect(() => {
    if (!props.initialStatus || !props.initialStatus.length) mutate();
    const interval = setInterval(mutate, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    if (data) setStatus(data.data);
  }, [data]);

  return (
    <Box>
      <Box direction="row" pad={{ horizontal: "medium" }}>
        <Box flex pad={{ vertical: "medium" }}>
          Monitor
        </Box>
        {isLoading && <Spinner size="xsmall" />}
      </Box>
      <Box pad="medium" style={{ whiteSpace: "pre-line" }}>
        {status}
      </Box>
    </Box>
  );
};

export default StatusMonitor;
