import React from "react";
import { Header, Main, Footer, Grid } from "grommet";

export default (props) => {
  const {
    plain,
    plainHeader,
    plainFooter,
    plainMain,
    header,
    main,
    footer,
    ...restProps
  } = props;
  const headerProps = {
    pad: plainHeader || plain ? "none" : "medium",
    color: plainHeader || plain ? "inherit" : "white",
    background: plainHeader || plain ? "inherit" : "brand"
  };
  const mainProps = {
    pad: plainMain || plain ? "none" : "medium"
  };
  const footerProps = {
    pad: {
      horizontal: plainFooter || plain ? "none" : "medium",
      vertical: plainFooter || plain ? "none" : "small"
    },
    color: plainFooter || plain ? "inherit" : "white",
    background: plainFooter || plain ? "inherit" : "brand"
  };

  return (
    <Grid fill rows={["auto", "flex", "auto"]} overflow="hidden" {...restProps}>
      <Header {...headerProps}>{header}</Header>
      <Main {...mainProps}>{main}</Main>
      <Footer {...footerProps}>{footer}</Footer>
    </Grid>
  );
};
