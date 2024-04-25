import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Album} from '../../types';

export const fetchAlbumsByArtist = createAsyncThunk<Album[], string>(
  'albums/fetchAlbumsByArtist',
  async (artistId): Promise<Album[]> => {
    const {data: albumsByArtist} = await axiosApi.get<Album[]>(`/albums?artist=${artistId}`);
    return albumsByArtist;
  }
);