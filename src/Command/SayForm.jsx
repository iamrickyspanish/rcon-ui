import React from "react";
import { TextInput, Box, Button } from "grommet";
import { Chat, FormClose } from "grommet-icons";
import { useMutation } from "react-query";
import { command } from "./api";

const SayForm = () => {
  const [message, setMessage] = React.useState("");
  const { mutate, isLoading, isSuccess } = useMutation((message) =>
    command(`say ${message}`)
  );

  const handleChange = React.useCallback((e) => {
    console.log("e.target.value", e.target.value);
    setMessage(e.target.value);
  }, []);

  const handleClear = React.useCallback(() => {
    setMessage("");
  }, []);

  const handleKey = React.useCallback(
    (e) => {
      console.log("e", e);
      if (e.which === 13) mutate(message);
    },
    [message]
  );

  React.useEffect(() => {
    if (!isLoading && isSuccess) setMessage("");
  }, [isLoading]);

  return (
    <Box
      direction="row"
      full="horizontal"
      border={{ color: "brand", size: "small" }}
      pad="medium"
      gap="small"
    >
      <Chat />
      <TextInput
        plain="full"
        value={message}
        onChange={handleChange}
        onKeyPress={handleKey}
        disabled={isLoading}
      />
      {message && message.length && (
        <Button
          icon={<FormClose />}
          plain
          onClick={handleClear}
          disabled={isLoading}
        />
      )}
    </Box>
  );
};

export default SayForm;
