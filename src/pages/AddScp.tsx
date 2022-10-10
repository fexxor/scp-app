import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import ScpForm from "../views/ScpForm";

class AddScp extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <Container sx={{ marginTop: "2rem" }}>
        <ScpForm formType={{ tag: "AddNewEntry" }} />
      </Container>
    );
  }
}

export default AddScp;
