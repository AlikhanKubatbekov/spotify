import {createAsyncThunk} from '@reduxjs/toolkit';
import {Track} from '../../types';
import axiosApi from '../../axiosApi';

export const fetchTracksByAlbums = createAsyncThunk<Track[], string>(
  'tracks/fetchTracksByAlbum',
  async (albumId): Promise<Track[]> => {
    const {data: tracksByAlbum} = await axiosApi.get(`/tracks?album=${albumId}`);
    return tracksByAlbum;
  }
);