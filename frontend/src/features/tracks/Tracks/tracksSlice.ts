import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { fetchTracksByAlbums } from './tracksThunk';
import { Track } from '../../../types/track';

interface TracksState {
  itemsByAlbum: Track[];
  fetchLoading: boolean;
}

const initialState: TracksState = {
  itemsByAlbum: [],
  fetchLoading: false,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracksByAlbums.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchTracksByAlbums.fulfilled, (state, { payload: tracks }) => {
        state.fetchLoading = false;
        state.itemsByAlbum = tracks;
      })
      .addCase(fetchTracksByAlbums.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracksByAlbum = (state: RootState) => state.tracks.itemsByAlbum;
export const selectFetchTracksLoading = (state: RootState) => state.tracks.fetchLoading;
