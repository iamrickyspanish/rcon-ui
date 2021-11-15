import React from "react";
import { TextInput, Box, Button } from "grommet";
import { Return, FormClose } from "grommet-icons";
import PropTypes from "prop-types";

const InputForm = (props) => {
  const [value, setValue] = React.useState(props.initialValue);

  const handleChange = React.useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleClear = React.useCallback(() => {
    setValue("");
  }, []);

  const handleKey = React.useCallback(
    (e) => {
      if (e.which === 13) wrappedSubmit();
    },
    [wrappedSubmit]
  );

  const wrappedSubmit = React.useCallback(() => {
    if (typeof props.onSubmit === "function") props.onSubmit(value);
  }, [props.onSubmit, value]);

  React.useEffect(() => {
    if (!props.isLoading) setValue("");
    // if (!props.isLoading && isSuccess) setValue("");
  }, [props.isLoading]);

  return (
    <Box
      direction="row"
      full="horizontal"
      border={{ color: "brand", size: "small" }}
      pad="medium"
      gap="small"
    >
      {props.icon}
      <TextInput
        plain="full"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKey}
        disabled={props.isLoading}
      />
      {value && value.length && (
        <Button
          icon={<FormClose />}
          plain
          onClick={handleClear}
          disabled={props.isLoading}
        />
      )}
      <Button
        icon={<Return />}
        plain
        onClick={wrappedSubmit}
        disabled={props.isLoading}
      />
    </Box>
  );
};

InputForm.propTypes = {
  initialValue: PropTypes.any,
  icon: PropTypes.node,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
};

InputForm.defaultProps = {
  initialValue: "",
  isLoading: false,
  icon: null
};

export default InputForm;
