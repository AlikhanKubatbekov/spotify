import mongoose from 'mongoose';
import config from './config';
import { randomUUID } from 'crypto';
import User from './models/User';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop....`);
  }
};

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomTrackDuration = () => {
  const min = getRandomNumber(1, 3);
  let sec;

  if (min === 1) {
    sec = getRandomNumber(16, 59);
  } else if (min === 3) {
    sec = getRandomNumber(0, 15);
  } else {
    sec = getRandomNumber(0, 59);
  }

  return min.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
};

const collections = ['users', 'tracks', 'trackhistories', 'artists', 'albums'];
const abyssTracksNames = ['Abyss', 'Pulse', 'Pulse', 'Translucid', 'Dark Beach'];
const etherealityTracksNames = ['Possession', 'Emotion', '3NDL3SS', 'Sakura', 'Iris'];
const theWorryTracksNames = ['Back Out', 'Another', 'Hands', 'Test & Recognise', 'Boys'];
const domeTracksNames = ['Go', '3', 'Blood Bank', 'Reset Head', 'Mingus'];
const gabrielTracksNames = ['ANGOSTURA', 'Limbo', 'Understand'];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  await User.create(
    {
      email: 'John',
      password: '1',
      token: randomUUID(),
      displayName: 'John',
      avatar: null,
      role: 'admin',
    },
    {
      email: 'Jack',
      password: '1',
      token: randomUUID(),
      displayName: 'Jack',
      avatar: null,
      role: 'user',
    },
  );

  const [pastelGhostArtist, seekaeArtist, keshiArtist] = await Artist.create(
    {
      name: 'Pastel Ghost',
      photo: 'fixtures/pastelGhostPhoto.jpeg',
      information: `PASTEL GHOST is a synthpop artist from Oakland, California, and currently based in Austin, Texas. 
    She self-released two EPs, Dark Beach EP and Shadows EP, 
    before signing to 80s Ladies Records for the release of her debut full-length album, Abyss.`,
      isPublished: true,
    },
    {
      name: 'Seekae',
      photo: 'fixtures/seekaePhoto.jpeg',
      information: `Seekae was a Sydney-based electronic music group. 
    They formed the group under the name Commander Keen in reference to the early-'90s MS-DOS video game series, 
    later changing the name to an elongated version of Commander Keen's initials (CK) after realising 
    the name was taken by a Scottish band. They released their debut album The Sound of Trees Falling 
    on People in 2008 and released the follow-up +Dome in 2011 and the EP 3 in 2012.`,
      isPublished: true,
    },
    {
      name: 'Keshi',
      photo: 'fixtures/keshiPhoto.jpeg',
      information: `Keshi is a Vietnamese-American artist under Island Records. 
    In 2017, he had quit his nursing job to pursue music full time.`,
      isPublished: false,
    },
  );

  const [abyssAlbum, etherealityAlbum, theWorryAlbum, domeAlbum, gabrielAlbum] = await Album.create(
    {
      title: 'Abyss',
      artist: pastelGhostArtist,
      publicDate: 2015,
      albumImage: 'fixtures/abyssAlbumImage.jpeg',
      isPublished: true,
    },
    {
      title: 'Ethereality',
      artist: pastelGhostArtist,
      publicDate: 2018,
      albumImage: 'fixtures/etherealityAlbumImage.jpeg',
      isPublished: true,
    },
    {
      title: 'The worry',
      artist: seekaeArtist,
      publicDate: 2014,
      albumImage: 'fixtures/theWorryAlbumImage.jpeg',
      isPublished: true,
    },
    {
      title: '+Dome',
      artist: seekaeArtist,
      publicDate: 2011,
      albumImage: 'fixtures/+domeAlbumImage.jpeg',
      isPublished: true,
    },
    {
      title: 'GABRIEL',
      artist: keshiArtist,
      publicDate: 2022,
      albumImage: 'fixtures/gabrielAlbumImage.png',
      isPublished: false,
    },
  );

  for (let trackNumber = 0; trackNumber < abyssTracksNames.length; trackNumber++) {
    await Track.create({
      trackNumber: trackNumber + 1,
      trackName: abyssTracksNames[trackNumber],
      album: abyssAlbum,
      trackDuration: getRandomTrackDuration(),
      isPublished: true,
    });
  }

  for (let trackNumber = 0; trackNumber < etherealityTracksNames.length; trackNumber++) {
    await Track.create({
      trackNumber: trackNumber + 1,
      trackName: etherealityTracksNames[trackNumber],
      album: etherealityAlbum,
      trackDuration: getRandomTrackDuration(),
      isPublished: true,
    });
  }

  for (let trackNumber = 0; trackNumber < theWorryTracksNames.length; trackNumber++) {
    await Track.create({
      trackNumber: trackNumber + 1,
      trackName: theWorryTracksNames[trackNumber],
      album: theWorryAlbum,
      trackDuration: getRandomTrackDuration(),
      isPublished: true,
    });
  }

  for (let trackNumber = 0; trackNumber < domeTracksNames.length; trackNumber++) {
    await Track.create({
      trackNumber: trackNumber + 1,
      trackName: domeTracksNames[trackNumber],
      album: domeAlbum,
      trackDuration: getRandomTrackDuration(),
      isPublished: true,
    });
  }

  for (let trackNumber = 0; trackNumber < gabrielTracksNames.length; trackNumber++) {
    await Track.create({
      trackNumber: trackNumber + 1,
      trackName: gabrielTracksNames[trackNumber],
      album: gabrielAlbum,
      trackDuration: getRandomTrackDuration(),
      isPublished: false,
    });
  }

  await db.close();
};

void run();
