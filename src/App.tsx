import React from "react";
import "./App.css";

import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./views/Navbar";
import AddScp from "./pages/AddScp";
import { Typography } from "@mui/material";
import ExploreScpEntries from "./pages/ExploreScpEntries";
import * as Api from "./Api";
import { Container } from "@mui/system";
import AboutScp from "./pages/AboutScp";

function App() {
  // This is just a workaround for easy testing with crudcrud.
  // Every time the react app is refreshed, we get a new api key.
  Api.loadApiKey().then((apiKeyRes) =>
    apiKeyRes.tag === "Success"
      ? Api.postTestData().then((testDataRes) =>
          testDataRes.tag === "Success"
            ? console.log("Posted test data")
            : console.log("Failed to post test data")
        )
      : console.log("Failed to load a new API key")
  );

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ExploreScpEntries />}></Route>
        <Route path="/add" element={<AddScp />}></Route>
        <Route path="/about" element={<AboutScp />}></Route>
        <Route
          path="*"
          element={
            <Container>
              <Typography variant="h5" sx={{ padding: "1rem" }}>
                Sidan kunde inte hittas
              </Typography>
            </Container>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
