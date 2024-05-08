import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import {TrackListenedTo} from '../../../types';

export const addTrackToHistory = createAsyncThunk<
  TrackListenedTo,
  string
>(
  'tracksHistories/addTrackToHistory',
  async (trackId): Promise<TrackListenedTo> => {
    const {data: listenedTrack} = await axiosApi.post<TrackListenedTo>(
      '/track_history',
      {track: trackId});

    return listenedTrack;
  }
);

export const fetchTracksHistories = createAsyncThunk<TrackListenedTo[], string | undefined>(
  'tracksHistories/fetchTracksHistories',
  async (): Promise<TrackListenedTo[]> => {
    const {data: trackHistory} = await axiosApi.get<TrackListenedTo[]>('/track_history');

    return trackHistory;
  }
);