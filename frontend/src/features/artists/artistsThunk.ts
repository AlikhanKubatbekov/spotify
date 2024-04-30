import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Artist} from '../../types';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async (): Promise<Artist[]> => {
    const response = await axiosApi.get<Artist[]>('/artists');
    return response.data;
  }
);

export const fetchArtistById = createAsyncThunk<Artist, string>(
  'artists/fetchArtist',
  async (artistId): Promise<Artist> => {
    const response = await axiosApi.get<Artist>(`/artists/${artistId}`);
    return response.data;
  }
);