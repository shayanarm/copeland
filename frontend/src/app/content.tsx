"use client";
import React from "react";
import Page from "@/components/Page";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import { Button, Card, CardContent, FormGroup, Input, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { start } from "repl";


type State = {
  search: string,
  searching: boolean,
  result: string | null,
};

export default function Content() {
  const [state, setState] = React.useState<State>({ search: '', searching: false, result: null });
  React.useEffect(() => {
    if (state.searching) {
      setState(s => ({ ...s, result: null }));
      try {
        setTimeout(() => {
          setState(s => ({ ...s, searching: false, result: 'hi' }));
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setState(s => ({ ...s, searching: false, result: null }));
      }
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
          <TextField id="standard-basic" label="Search for city, zip code, or coordinates" variant="standard" sx={{ flexGrow: 1 }} value={state.search} onChange={(e) => setState(s => ({ ...s, search: e.target.value }))} />
          <Button type="submit" variant="contained" sx={{ borderRadius: 0, boxShadow: 'none', ":hover": { boxShadow: 'none' } }} endIcon={<SearchIcon />} onClick={() => setState(s => ({ ...s, searching: true }))}>Go</Button>
      </Box>
      {state.result && <>
        <br></br>
        <Card variant="outlined" sx={theme => ({borderColor: theme.palette.primary.main})}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {state.result}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {state.result}
            </Typography>
          </CardContent>
        </Card>
      </>}
    </Page>
  );
}