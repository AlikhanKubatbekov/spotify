import { createSlice } from '@reduxjs/toolkit';
import { fetchArtistById, fetchArtists } from './artistsThunk';
import { RootState } from '../../app/store';
import { Artist } from '../../types/artist';

interface ArtistsState {
  items: Artist[];
  artist: Artist | null;
  fetchLoading: boolean;
  fetchOneArtistLoading: boolean;
}

const initialState: ArtistsState = {
  items: [],
  artist: null,
  fetchLoading: false,
  fetchOneArtistLoading: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
        state.fetchLoading = false;
        state.items = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchArtistById.pending, (state) => {
        state.fetchOneArtistLoading = true;
      })
      .addCase(fetchArtistById.fulfilled, (state, { payload: artist }) => {
        state.fetchOneArtistLoading = false;
        state.artist = artist;
      })
      .addCase(fetchArtistById.rejected, (state) => {
        state.fetchOneArtistLoading = false;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtist = (state: RootState) => state.artists.artist;
export const selectFetchArtistsLoading = (state: RootState) => state.artists.fetchLoading;
