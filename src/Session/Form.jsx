import React from "react";
import { useFormik } from "formik";
import { Box, TextInput, Select, FormField, Button, Grid } from "grommet";
import { create } from "./api";
import { useMutation } from "react-query";
import useNotifications from "Notification/use";

const gameOptions = Object.freeze([
  { value: "cstrike", label: "Counter Strike 1.6" }
]);

const SessionForm = ({ onSessionStart }) => {
  // const { isLoading, error, data } = useQuery("repoData", create(values));
  const { showNotification } = useNotifications();
  const formik = useFormik({
    initialValues: {
      game: "cstrike",
      host: null,
      port: 27015,
      password: null
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const result = await create(values);
        console.log("r", result);
        onSessionStart(result);
        showNotification("Connected", "success");
      } catch (e) {
        console.log(e);
        showNotification(e.message, "error");
        throw e;
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <Grid rows={["flex", "auto"]} as="form" onSubmit={formik.handleSubmit} fill>
      <Box flex overflow="auto">
        <Box>
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
        </Box>
      </Box>
      <Box pad="medium">
        <Button label="START" type="submit" disabled={formik.isSubmitting} />
      </Box>
    </Grid>
  );
};

export default SessionForm;
