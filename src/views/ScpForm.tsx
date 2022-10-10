import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import React, { ChangeEventHandler } from "react";
import * as Api from "../Api";
import { ScpEntry } from "../types/ScpEntry";

export type FormType =
  | { tag: "UpdateExistingEntry"; entry: ScpEntry }
  | { tag: "AddNewEntry" };

type ScpFormProps = {
  formType: FormType;
  onSubmitSuccessful?: (scpEntry: ScpEntry) => void;
};

type ScpFormState = {
  _id?: string;
  scpNumber: string | null;
  name: string | null;
  description: string | null;
  submitStatus:
    | "NotSubmitted"
    | "Submitting"
    | "SubmitSuccessful"
    | "SubmitFailed";
  hasValidationErrors: boolean;
};

class ScpForm extends React.Component<ScpFormProps, ScpFormState> {
  constructor(props: ScpFormProps) {
    super(props);
    this.state =
      props.formType.tag === "UpdateExistingEntry"
        ? {
            _id: props.formType.entry._id,
            scpNumber: props.formType.entry.scpNumber,
            name: props.formType.entry.name,
            description: props.formType.entry.description,
            submitStatus: "NotSubmitted",
            hasValidationErrors: false,
          }
        : {
            scpNumber: null,
            name: null,
            description: null,
            submitStatus: "NotSubmitted",
            hasValidationErrors: false,
          };
  }

  private handleScpNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => this.setState({ scpNumber: event.target.value });

  private handleNameChange: ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => this.setState({ name: event.target.value });

  private handleDescriptionChange: ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => this.setState({ description: event.target.value });

  private save = () => {
    const validatedScp = this.validateForm(this.state);

    if (validatedScp === "ValidationErrors") {
      this.setState({ hasValidationErrors: true });
    } else {
      this.setState({ submitStatus: "Submitting" });

      const submitFunction =
        this.props.formType.tag === "UpdateExistingEntry"
          ? Api.updateScpEntry
          : Api.postScpEntry;

      submitFunction(validatedScp).then((response) => {
        if (response.tag === "Success") {
          this.setState({
            submitStatus: "SubmitSuccessful",
            scpNumber: null,
            name: null,
            description: null,
            hasValidationErrors: false,
          });

          if (this.props.onSubmitSuccessful) {
            // If the update call responded with the actual entry, we could have used that here.
            this.props.onSubmitSuccessful(validatedScp);
          }
        } else {
          this.setState({ submitStatus: "SubmitFailed" });
        }
      });
    }
  };

  private validateForm = ({
    _id,
    scpNumber,
    name,
    description,
  }: ScpFormState): ScpEntry | "ValidationErrors" =>
    scpNumber && name && description
      ? { _id, scpNumber, name, description }
      : // TODO: Create better and more granular error variants
        "ValidationErrors";

  render(): JSX.Element {
    return (
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={8} lg={8}>
          <Card variant="outlined" sx={{ padding: "2rem" }}>
            <Typography variant="h5" marginBottom="2rem">
              {this.props.formType.tag === "UpdateExistingEntry"
                ? "Redigera objekt"
                : "Lägg till nytt objekt"}
            </Typography>
            <Grid container spacing="2rem">
              <Grid item xs={12}>
                {/* TODO: Restrict to only be numerical */}
                <TextField
                  fullWidth
                  label="SFB-nummer"
                  variant="outlined"
                  onChange={this.handleScpNumberChange}
                  value={this.state.scpNumber || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Namn"
                  variant="outlined"
                  onChange={this.handleNameChange}
                  value={this.state.name || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Beskrivning"
                  variant="outlined"
                  multiline
                  rows={5}
                  onChange={this.handleDescriptionChange}
                  value={this.state.description || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" onClick={this.save}>
                  Spara
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: "rgba(255,0,0,.1)",
                    padding: "1rem",
                    display: this.state.hasValidationErrors ? "auto" : "none",
                  }}
                >
                  All fält måste fyllas i för att du ska kunna spara
                </Box>
                <Box
                  sx={{
                    backgroundColor: "rgba(255,0,0,.1)",
                    padding: "1rem",
                    display:
                      this.state.submitStatus === "SubmitFailed"
                        ? "auto"
                        : "none",
                  }}
                >
                  Något gick fel
                </Box>
                <Box
                  sx={{
                    backgroundColor: "rgba(0,255,0,.1)",
                    padding: "1rem",
                    display:
                      this.state.submitStatus === "SubmitSuccessful"
                        ? "auto"
                        : "none",
                  }}
                >
                  Objektet har sparats
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default ScpForm;
