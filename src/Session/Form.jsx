import React from "react";
import { useFormik } from "formik";
import { Box, TextInput, Select, FormField, Button } from "grommet";
import { create } from "./api";

const gameOptions = Object.freeze([
  { value: "cstrike", label: "Counter Strike 1.6" }
]);

const SessionForm = () => {
  const formik = useFormik({
    initialValues: {
      game: "cstrike",
      host: null,
      port: 27015,
      password: null
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      create(values);
      setSubmitting(false);
    }
  });

  return (
    <Box as="form" onSubmit={formik.handleSubmit}>
      <FormField label="game" error={formik.errors.game}>
        <Select
          {...formik.getFieldProps("game")}
          placeholder="Select"
          labelKey="label"
          valueKey={{ key: "value", reduce: true }}
          options={gameOptions}
          disabled={formik.isSubmitting}
        />
      </FormField>
      <FormField label="host" error={formik.errors.host}>
        <TextInput
          {...formik.getFieldProps("host")}
          disabled={formik.isSubmitting}
        />
      </FormField>
      <FormField label="port" error={formik.errors.port}>
        <TextInput
          {...formik.getFieldProps("port")}
          disabled={formik.isSubmitting}
        />
      </FormField>
      <FormField label="password" error={formik.errors.password}>
        <TextInput
          type="password"
          {...formik.getFieldProps("password")}
          disabled={formik.isSubmitting}
        />
      </FormField>
      <Button label="START" type="submit" disabled={formik.isSubmitting} />
    </Box>
  );
};

export default SessionForm;
