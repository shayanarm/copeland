import { State } from '@/model';
import { AlertColor } from '@mui/material';
import React from 'react';

export const StateContext: React.Context<{
    state: State;
    setState: React.Dispatch<React.SetStateAction<State>>;
}> = React.createContext({ 
    state: { loading: false } as State, 
    setState: (() => { }) as React.Dispatch<React.SetStateAction<State>> 
});