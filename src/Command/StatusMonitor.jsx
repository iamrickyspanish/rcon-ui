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
    if (data) setStatus(data.data);
  }, [data]);
  if (data && data.data) parseStatus(data.data);

  const { hostname, players, playerCount, maxPlayers, map } =
    parseStatus(status);
  return (
    <Grid rows={["auto", "auto", "flex"]} fill>
      <Box border="bottom" pad="medium">
        <Text weight="bold">{hostname}</Text>
      </Box>
      <Box pad="medium" direction="row" justify="between" align="center">
        <Text>Map ({map})</Text>
        <Text>
          Players ({playerCount}/{maxPlayers})
        </Text>
      </Box>
      {players.length ? null : (
        <Box fill align="center" justify="center">
          Server is Empty
        </Box>
      )}
    </Grid>
  );
};

export default StatusMonitor;
