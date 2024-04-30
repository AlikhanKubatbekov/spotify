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
    const {data: listenedTrack} = await axiosApi.post<TrackListenedTo>(
      '/track_history',
      {track: trackId},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

    return listenedTrack;
  }
);

export const fetchTracksHistories = createAsyncThunk<TrackListenedTo[], string | undefined>(
  'tracksHistories/fetchTracksHistories',
  async (token): Promise<TrackListenedTo[]> => {
    const {data: trackHistory} = await axiosApi.get<TrackListenedTo[]>('/track_history', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return trackHistory;
  }
);