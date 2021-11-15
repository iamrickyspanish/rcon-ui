import React from "react";

import { Grid, Box, Spinner, Text } from "grommet";
import { command } from "./api";
import { useMutation } from "react-query";
// import use from "Notification/use";

const parseInfo = (infoString) => {
  const data = infoString
    .split("\n")
    .map((tupelString) => tupelString.split(": "))
    .reduce((data, tupel) => {
      const [key, value] = tupel;
      data[key.trim()] = value.trim();
      return data;
    }, {});
  // data.
  data.map = data.map.slice(0, data.map.indexOf(" "));
  data.playerCount = Number(data.players.slice(0, data.players.indexOf(" ")));
  data.maxPlayers = Number(
    data.players.slice(
      data.players.indexOf("(") + 1,
      data.players.indexOf(" max")
    )
  );
  delete data.players;
  return data;
};

const parseStatus = (statusString) => {
  const [infoString, playersString] = statusString.split("\n\n");
  console.log("strings", infoString, playersString);
  const info = parseInfo(infoString);
  console.log("info", info);
  return { ...info, players: [] };
};

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
    if (data && data.data) setStatus(data.data);
  }, [data]);

  const {
    hostname,
    players = [],
    playerCount,
    maxPlayers,
    map
  } = status ? parseStatus(status) : {};
  return (
    <Grid rows={["auto", "flex"]} fill>
      <Box border="bottom" pad="medium" gap="xsmall">
        <Text weight="bold">{hostname}</Text>
        <Box direction="row" justify="between" align="center">
          <Text size="small">{map}</Text>
          <Text size="small">
            {playerCount}/{maxPlayers} players
          </Text>
        </Box>
      </Box>
      {players.length ? null : (
        <Box fill align="center" justify="center">
          Server is Empty
        </Box>
      )}
    </Grid>
  );
};

StatusMonitor.defautProps = {
  initialStatus: null
};

export default StatusMonitor;
