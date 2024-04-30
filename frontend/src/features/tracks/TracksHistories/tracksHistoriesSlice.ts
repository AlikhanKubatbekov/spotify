import {createSlice} from '@reduxjs/toolkit';
import {addTrackToHistory} from './tracksHistoriesThunk';
import {RootState} from '../../../app/store';
import {GlobalError, TrackListenedTo} from '../../../types';

interface TracksListenedToState {
  tracksHistory: TrackListenedTo[];
  fetchTracksHistoriesLoading: boolean;
  addTrackToHistoryLoading: boolean;
  addTrackToHistoryError: GlobalError | null;
}

const initialState: TracksListenedToState = {
  tracksHistory: [],
  fetchTracksHistoriesLoading: false,
  addTrackToHistoryLoading: false,
  addTrackToHistoryError: null
};

export const tracksHistoriesSlice = createSlice({
  name: 'tracksListenedTo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addTrackToHistory.pending, (state) => {
      state.addTrackToHistoryLoading = true;
      state.addTrackToHistoryError = null;
    }).addCase(addTrackToHistory.fulfilled, (state, {payload: trackListenedTo}) => {
      state.addTrackToHistoryLoading = false;
      state.tracksHistory.push(trackListenedTo);
    }).addCase(addTrackToHistory.rejected, (state, {payload: error}) => {
      state.addTrackToHistoryLoading = false;
      state.addTrackToHistoryError = error || null;
    });
  }
});

export const tracksHistoriesReducer = tracksHistoriesSlice.reducer;

export const selectAddTrackToHistoryLoading = (state: RootState) => state.tracksHistories.addTrackToHistoryLoading;
export const selectAddTrackToHistoryError = (state: RootState) => state.tracksHistories.addTrackToHistoryError;