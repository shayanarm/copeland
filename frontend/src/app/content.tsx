"use client";
import React from "react";
import Page from "@/components/Page";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import { Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import LocationIcon from "@mui/icons-material/LocationSearching";


type State = {
  search: string | Geo | null | undefined,
  searching: boolean,
  result: Result | null | undefined,
};

type Geo = {
  lat: number,
  lng: number
}

type Result = {
  coord: {
    lon: number,
    lat: number
  },
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
  },
  visibility: number,
  wind: {
    speed: number,
    deg: number,
    gust: number
  },
  clouds: {
    all: number
  },
  dt: number,
  sys: {
    type: 2,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
  },
  timezone: number,
  id: number,
  name: string,
  cod: number
};

export default function Content() {
  const [state, setState] = React.useState<State>({ search: null, searching: false, result: null });
  React.useEffect(() => {
    if (state.searching) {
      setState(s => ({ ...s, result: null }));
      (async () => {
        let result: Result | null = null;
        let query = undefined;
        const isGeo = (obj: any): obj is Geo => true;
        try {
          if (typeof state.search === 'string') {
            query = `q=${state.search}`;
          } else if (state.search && isGeo(state.search)) {
            query = `lat=${state.search.lat}&lng=${state.search.lng}`;
          }

          if (query) {
            const response = await fetch(`/api/weather-info?${query}`, {
              method: "GET"
            });
            if (response.status === 200) {
              const data = await response.json();
              result = data as Result;
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          result = null;
        } finally {
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
          setState(s => ({ ...s, search: typeof s.search === "string" ? s.search : undefined, searching: true }));
        }}
      >
        <TextField
          id="standard-basic"
          label="Search using city, region or zip code"
          variant="standard" sx={{ flexGrow: 1 }}
          value={typeof state.search === "string" ? state.search : ''}
          onChange={(e) => setState(s => ({ ...s, search: e.target.value }))} />
        <IconButton
          disabled={state.searching}
          color="primary"
          aria-label="Search by your location"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                setState(s => ({ ...s, search: { lat: position.coords.latitude, lng: position.coords.longitude }, searching: true }))
              });
            } else {
              alert("Geolocation is not supported by this browser.");
            };
          }}
        >
          <LocationIcon />
        </IconButton>
        <Button
          disabled={state.searching}
          type="submit"
          variant="contained"
          sx={{ borderRadius: 0, boxShadow: 'none', ":hover": { boxShadow: 'none' } }}
          endIcon={<SearchIcon />}
          onClick={() => setState(s => ({ ...s, search: typeof s.search === "string" ? s.search : undefined, searching: true }))}
        >
          Go
        </Button>
      </Box>
      {(state.result || state.searching) && <>
        <br></br>
        <Card variant="outlined" sx={theme => ({ borderColor: theme.palette.primary.main })}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="div">
                  {(state.result && `${state.result.name}, ${state.result.sys.country}`) || "..."}
                </Typography>
              </Grid>
              <Grid item xs='auto'>
                <Typography gutterBottom variant="h5" component="div">
                  {(state.result && `${state.result.main.temp} °C`) || "..."}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {(state.result && state.result.weather[0]!.description) || "..."}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>}
    </Page>
  );
}