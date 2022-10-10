import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { ScpEntry } from "../types/ScpEntry";
import * as Api from "../Api";
import { Container } from "@mui/system";
import ScpForm from "../views/ScpForm";

type ExploreScpEntriesState =
  | { tag: "NotRequested" }
  | { tag: "Loading" }
  | { tag: "Loaded"; entries: ScpEntryState[] }
  | { tag: "Error"; error: Api.ApiError };

type ScpEntryState = { entry: ScpEntry; isBeingEdited: boolean };

class ExploreScpEntries extends React.Component<{}, ExploreScpEntriesState> {
  constructor(props: {}) {
    super(props);
    this.state = { tag: "NotRequested" };
  }

  componentDidMount() {
    this.setState({ tag: "Loading" });

    Api.getScpEntries().then((response) => {
      if (response.tag === "Success") {
        this.setState({
          tag: "Loaded",
          entries: response.payload.map((e) => ({
            entry: e,
            isBeingEdited: false,
          })),
        });
      } else {
        this.setState({
          tag: "Error",
          error: response.error,
        });
      }
    });
  }

  render(): JSX.Element {
    return (
      <Container sx={{ marginTop: "2rem" }}>
        {this.renderScpEntries(this.state)}
      </Container>
    );
  }

  private renderScpEntries = (
    scpEntries: ExploreScpEntriesState
  ): JSX.Element => {
    console.log(scpEntries);
    switch (scpEntries.tag) {
      case "NotRequested":
        return <div>hej</div>;
      case "Loading":
        return (
          <Box padding="1rem">
            <CircularProgress />
          </Box>
        );
      case "Loaded":
        if (scpEntries.entries.length === 0) {
          return (
            <Typography variant="h6">
              Det finns inga inlägg i registet ännu
            </Typography>
          );
        } else {
          return (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              sx={{ justifyContent: "center" }}
            >
              {scpEntries.entries.map(this.renderScpEntry)}
            </Grid>
          );
        }
      case "Error":
        if (scpEntries.error === "NoEntriesFound") {
          return (
            <Typography variant="h6">
              Det finns inga SFBs i registet ännu
            </Typography>
          );
        } else {
          return (
            <Box
              sx={{
                backgroundColor: "rgba(255,0,0,.1)",
                padding: "1rem",
              }}
            >
              <Typography variant="h6">Något gick fel</Typography>
            </Box>
          );
        }
    }
  };

  private renderScpEntry = ({
    entry,
    isBeingEdited,
  }: ScpEntryState): JSX.Element => {
    if (isBeingEdited) {
      return (
        <React.Fragment key={entry._id}>
          <Grid item xs={12}>
            <ScpForm
              formType={{ tag: "UpdateExistingEntry", entry: entry }}
              onSubmitSuccessful={() => this.foo(entry._id || "TODO")}
            />
          </Grid>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment key={entry._id}>
          <Grid item xs={12} md={8} lg={8}>
            <Card variant="outlined" sx={{ padding: "1rem" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {"SFB-" + entry.scpNumber}
                </Typography>
                <Typography variant="h5" component="div">
                  {entry.name}
                </Typography>
                <Typography
                  sx={{
                    marginTop: "1rem",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {entry.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => this.handleEditClicked(entry._id || "TODO")}
                >
                  Redigera
                </Button>
                <Button
                  size="small"
                  onClick={() => this.handleDeleteClicked(entry._id || "TODO")}
                >
                  Ta bort
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </React.Fragment>
      );
    }
  };

  private foo = (scpId: string) => {
    if (this.state.tag === "Loaded") {
      this.setState({
        tag: "Loaded",
        entries: this.state.entries.map((e) =>
          e.entry._id === scpId
            ? {
                entry: e.entry,
                isBeingEdited: false,
              }
            : e
        ),
      });
    }
  };

  private handleEditClicked = (scpId: string) => {
    if (this.state.tag === "Loaded") {
      this.setState({
        tag: "Loaded",
        entries: this.state.entries.map((e) =>
          e.entry._id === scpId
            ? {
                entry: e.entry,
                isBeingEdited: true,
              }
            : e
        ),
      });
    }
  };

  // TODO: The removal should be communicated to the user in a better way.
  private handleDeleteClicked = (scpId: string) => {
    Api.deleteScpEntry(scpId).then(() => {
      if (this.state.tag === "Loaded") {
        this.setState({
          tag: "Loaded",
          entries: this.state.entries.filter(
            (scpEntryState) => scpEntryState.entry._id !== scpId
          ),
        });
      }
    });
  };
}

export default ExploreScpEntries;
