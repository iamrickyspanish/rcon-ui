import React from "react";
import { Chat } from "grommet-icons";
import { useMutation } from "react-query";
import { command } from "./api";
import InputForm from "Shared/InputForm";

const SayForm = () => {
  const { mutate, isLoading, isSuccess } = useMutation((message) =>
    command(`say ${message}`)
  );

  return (
    <InputForm
      isLoading={isLoading}
      // isSuccess={isSuccess}
      icon={<Chat />}
      onSubmit={mutate}
    />
  );
};

export default SayForm;
