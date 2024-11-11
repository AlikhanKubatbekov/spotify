import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchAlbumsByArtist } from './albumsThunk';
import { Album } from '../../types/album';

interface AlbumsState {
  itemsByArtist: Album[];
  fetchLoading: boolean;
}

const initialState: AlbumsState = {
  itemsByArtist: [],
  fetchLoading: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsByArtist.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAlbumsByArtist.fulfilled, (state, { payload: albums }) => {
        state.fetchLoading = false;
        state.itemsByArtist = albums;
      })
      .addCase(fetchAlbumsByArtist.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbumsByArtist = (state: RootState) => state.albums.itemsByArtist;
export const selectFetchAlbumsLoading = (state: RootState) => state.albums.fetchLoading;
