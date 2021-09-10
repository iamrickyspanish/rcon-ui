import React from "react";
import {
  Box,
  TextInput,
  Select,
  FormField,
  Button,
  Grid,
  Text,
  Form
} from "grommet";
import { create } from "./api";
import { useMutation } from "react-query";
import useNotifications from "Notification/use";
import PageLayout from "Layout/Page";

const gameOptions = Object.freeze([
  { value: "cstrike", label: "Counter Strike 1.6" }
]);

const SessionForm = ({ onSessionStart }) => {
  const { showNotification } = useNotifications();
  const [value, setValue] = React.useState({
    game: "cstrike",
    host: "panel.frag.world", //null,
    port: 27015,
    password: "affe" //null
  });
  const { mutate, isLoading } = useMutation(create, {
    onSuccess: (data) => {
      showNotification("Connected", "success");
      onSessionStart(data);
    },
    onError: (e) => showNotification(e.message, "error")
  });

  const handleSubmit = React.useCallback(async (e) => {
    mutate(e.value);
  }, []);

  return (
    <PageLayout
      as={Form}
      value={value}
      onChange={setValue}
      onSubmit={handleSubmit}
      plainMain
      plainFooter
      header={<Text>CONNECT TO SERVER</Text>}
      main={
        <Grid pad={{ vertical: "medium" }} rows={["auto"]}>
          <FormField label="game">
            <Select
              name="game"
              placeholder="Select"
              labelKey="label"
              valueKey={{ key: "value", reduce: true }}
              options={gameOptions}
              disabled={isLoading}
            />
          </FormField>
          <FormField label="host">
            <TextInput name="host" disabled={isLoading} />
          </FormField>
          <FormField label="port">
            <TextInput name="port" disabled={isLoading} />
          </FormField>
          <FormField label="password">
            <TextInput name="password" type="password" disabled={isLoading} />
          </FormField>
        </Grid>
      }
      footer={
        <Button primary fill label="START" type="submit" disabled={isLoading} />
      }
    />
    // </Form>
  );
};

export default SessionForm;
