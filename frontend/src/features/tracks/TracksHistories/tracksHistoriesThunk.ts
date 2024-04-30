import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import {TrackListenedTo} from '../../../types';

export const addTrackToHistory = createAsyncThunk<
  TrackListenedTo,
  { token: string | undefined, trackId: string }
>(
  'tracksHistories/addTrackToHistory',
  async (
    {token, trackId}
  ): Promise<TrackListenedTo> => {
    const response = await axiosApi.post<TrackListenedTo>(
      '/track_history',
      {track: trackId},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

    return response.data;
  }
);