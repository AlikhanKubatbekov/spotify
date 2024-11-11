import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import { Track } from '../../../types/track';

export const fetchTracksByAlbums = createAsyncThunk<Track[], string>('tracks/fetchTracksByAlbum', async (albumId): Promise<Track[]> => {
  const { data: tracksByAlbum } = await axiosApi.get(`/tracks?album=${albumId}`);
  return tracksByAlbum;
});
