import {createSlice} from '@reduxjs/toolkit';
import {addTrackToHistory, fetchTracksHistories} from './tracksHistoriesThunk';
import {RootState} from '../../../app/store';
import {TrackListenedTo} from '../../../types';

interface TracksListenedToState {
  items: TrackListenedTo[];
  fetchTracksHistoriesLoading: boolean;
  addTrackToHistoryLoading: boolean;
}

const initialState: TracksListenedToState = {
  items: [],
  fetchTracksHistoriesLoading: false,
  addTrackToHistoryLoading: false,
};

export const tracksHistoriesSlice = createSlice({
  name: 'tracksListenedTo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addTrackToHistory.pending, (state) => {
      state.addTrackToHistoryLoading = true;
    }).addCase(addTrackToHistory.fulfilled, (state) => {
      state.addTrackToHistoryLoading = false;
    }).addCase(addTrackToHistory.rejected, (state) => {
      state.addTrackToHistoryLoading = false;
    });

    builder.addCase(fetchTracksHistories.pending, (state) => {
      state.fetchTracksHistoriesLoading = true;
    }).addCase(fetchTracksHistories.fulfilled, (state, {payload: trackHistory}) => {
      state.fetchTracksHistoriesLoading = false;
      state.items = trackHistory;
    }).addCase(fetchTracksHistories.rejected, (state) => {
      state.fetchTracksHistoriesLoading = false;
    });
  }
});

export const tracksHistoriesReducer = tracksHistoriesSlice.reducer;

export const selectTracksHistory = (state: RootState) => state.tracksHistories.items;

export const selectAddTrackToHistoryLoading = (state: RootState) => state.tracksHistories.addTrackToHistoryLoading;
export const selectFetchTracksHistoryLoading = (state: RootState) => state.tracksHistories.fetchTracksHistoriesLoading;