import React from "react";
import NotificationContext from "./context";
import useNotifications from "./use";
import PropTypes from "prop-types";
import { Layer, Box, Text, Button } from "grommet";
import {
  StatusGood,
  StatusCritical,
  StatusWarning,
  StatusInfo,
  FormClose
} from "grommet-icons";
import { v4 as uuidv4 } from "uuid";
const mapTypeToIcon = (type) => {
  switch (type) {
    case "success":
      return <StatusGood />;
    case "error":
      return <StatusCritical />;
    case "warning":
      return <StatusWarning />;
    case "info":
    default:
      return <StatusInfo />;
  }
};

const mapTypeToColors = (type) => {
  switch (type) {
    case "success":
      return ["status-ok", "white"];
    case "error":
      return ["status-critical", "white"];
    case "warning":
      return ["status-warning", "white"];
    case "info":
    default:
      return ["white", "brand"];
  }
};

const Notification = (props) => {
  const [bg, color] = mapTypeToColors(props.type);
  const icon = mapTypeToIcon(props.type);
  return (
    <Box
      gap="medium"
      direction="row"
      background={bg}
      color={color}
      pad="medium"
      align="center"
      fill="horizontal"
    >
      {icon}
      <Box as={Text} size="small" weight="bold" flex direction="row">
        {props.message}
      </Box>
      <Button plain>
        <FormClose onClick={props.onClose} />
      </Button>
    </Box>
  );
};

Notification.propTypes = {
  status: PropTypes.oneOf(["success", "error", "warning", "info"]),
  title: PropTypes.string,
  onClose: PropTypes.func
};

Notification.propTypes = {
  status: "info",
  title: "",
  onClose: (f) => f
};

const NotificationContainer = () => {
  const { notifications, closeNotification, closeAllNotifications } =
    useNotifications();

  const createCloseFn = React.useCallback(
    (id) => () => closeNotification(id),
    [closeNotification]
  );

  return (
    <Layer
      position="bottom"
      modal={false}
      // margin={{ vertical: "medium", horizontal: "small" }}
      responsive={false}
      plain
      full="horizontal"
    >
      {notifications.length > 4 && (
        <Box direction="row" full="horizontal" justify="flex-end">
          <Button
            icon={<FormClose size="xsmall" />}
            label="close all"
            plain
            onClick={closeAllNotifications}
          />
        </Box>
      )}
      <Box gap="small" direction="column-reverse">
        {notifications.map((notification) => (
          <Box animation="fadeIn" elevation="medium" key={notification.id}>
            <Notification
              {...notification}
              onClose={createCloseFn(notification.id)}
            />
          </Box>
        ))}
      </Box>
    </Layer>
  );
};

export default ({ children, ...restProps }) => {
  //   restProps
  const [notifications, setNotifications] = React.useState([]);

  const showNotification = React.useCallback(
    (message, type) => {
      const id = uuidv4();
      const notification = { message, type, id };
      setNotifications([...notifications, notification]);
      return id;
    },
    [notifications]
  );

  const closeNotification = React.useCallback(
    (id) => {
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      );
    },
    [notifications]
  );

  const closeAllNotifications = React.useCallback(() => {
    setNotifications([]);
  }, []);

  const ctx = {
    notifications,
    showNotification,
    closeNotification,
    closeAllNotifications
  };

  return (
    <NotificationContext.Provider value={ctx}>
      <NotificationContainer />
      {children}
    </NotificationContext.Provider>
  );
};
