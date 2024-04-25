import {createSlice} from '@reduxjs/toolkit';
import {Artist} from '../../types';
import {fetchArtists} from './artistsThunk';
import {RootState} from '../../app/store';

interface ArtistsState {
  items: Artist[];
  fetchLoading: boolean;
}

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
      state.fetchLoading = false;
      state.items = artists;
    }).addCase(fetchArtists.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.items;
export const selectFetchArtistsLoading = (state: RootState) => state.artists.fetchLoading;
