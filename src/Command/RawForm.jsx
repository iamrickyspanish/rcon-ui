import React from "react";
import { Box, Form, FormField, TextInput, Button, Spinner } from "grommet";
import { useMutation } from "react-query";
import { command } from "./api";
const CommandForm = () => {
  const { isSuccess, isError, isLoading, mutate, error } = useMutation(
    "command",
    command
  );
  const [values, setValues] = React.useState({ message: "" });

  return (
    <Form
      value={values}
      onChange={setValues}
      onSubmit={(e) => mutate(e.value.message)}
    >
      <FormField label="command">
        <TextInput name="message" disabled={isLoading} />
      </FormField>
      <Box pad="medium">
        <Button label="SEND" type="submit" disabled={isLoading} />
      </Box>
      {isSuccess && "DONE"}
      {isError && (
        <Box pad="medium" color="danger">
          {error}
        </Box>
      )}
    </Form>
  );
};

export default CommandForm;
