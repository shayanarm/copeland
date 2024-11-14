"use client";
import React from "react";
import Page from "@/components/Page";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import { Button, Card, CardContent, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


type State = {
  search: string,
  searching: boolean,
  result: Result | null,
};

type Result = {
  place: string,
  temp: string,
  description: string,
};

export default function Content() {
  const [state, setState] = React.useState<State>({ search: '', searching: false, result: null });
  React.useEffect(() => {
    if (state.searching) {
      setState(s => ({ ...s, result: null }));
      (async () => {
        let result: Result | null = null;
        try {
          const response = await fetch(`/api/weather-info?query=${state.search}`, {
            method: "GET"
          });
          const data = await response.json();
          result = data as Result;
        } catch (error) {
          console.error("Error fetching data:", error);
          result = null;
        } finally {
          console.log(result);
          setState(s => ({ ...s, searching: false, result }))
        }
      })();
    }
  }, [state.searching]);

  return (
    <Page maxWidth="sm">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ display: "flex" }}
        onSubmit={(e) => {
          e.preventDefault();
          setState(s => ({ ...s, searching: true }));
        }}
      >
        <TextField
          id="standard-basic"
          label="Search for city, zip code, or coordinates"
          variant="standard" sx={{ flexGrow: 1 }}
          value={state.search}
          onChange={(e) => setState(s => ({ ...s, search: e.target.value }))} />
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 0, boxShadow: 'none', ":hover": { boxShadow: 'none' } }}
          endIcon={<SearchIcon />}
          onClick={() => setState(s => ({ ...s, searching: true }))}
        >
          Go
        </Button>
      </Box>
      {state.result && <>
        <br></br>
        <Card variant="outlined" sx={theme => ({ borderColor: theme.palette.primary.main })}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {state.result.place}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {state.result.description}
            </Typography>
          </CardContent>
        </Card>
      </>}
    </Page>
  );
}