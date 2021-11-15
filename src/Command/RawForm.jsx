import React from "react";
import { Terminal } from "grommet-icons";
import { useMutation } from "react-query";
import { command } from "./api";
import InputForm from "Shared/InputForm";

const CommandForm = () => {
  const { isSuccess, isError, isLoading, mutate, error } = useMutation(
    "command",
    command
  );

  return (
    <InputForm icon={<Terminal />} isLoading={isLoading} onSubmit={mutate} />
  );
};

export default CommandForm;
