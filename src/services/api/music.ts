import {apisauceInstance} from './services';

type ListMusicParams = {
  limit?: number;
  offset: number;
  types?: string;
};
interface Artwork {
  width: number;
  height: number;
  url: string;
  bgColor: string;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
}

interface PlayParams {
  id: string;
  kind: string;
}

interface SongAttributes {
  albumName: string;
  genreNames: string[];
  trackNumber: number;
  releaseDate: string;
  durationInMillis: number;
  isrc: string;
  artwork: Artwork;
  composerName?: string;
  playParams: PlayParams;
  url: string;
  discNumber: number;
  hasCredits: boolean;
  isAppleDigitalMaster: boolean;
  hasLyrics: boolean;
  name: string;
  previews: {url: string}[];
  artistName: string;
  contentRating?: string;
}

interface Song {
  id: string;
  type: string;
  href: string;
  attributes: SongAttributes;
}

interface Chart {
  chart: string;
  name: string;
  orderId: string;
  next: string;
  data: Song[];
  href: string;
}

interface Results {
  songs?: Chart[];
  albums?: Chart[];
}

interface OrderResult {
  order: string[];
}

interface Meta {
  results: OrderResult;
}

export type ListMusicResponse = {
  results: Results;
  meta: Meta;
};

export const getListMusicChart = ({
  limit = 10,
  offset,
  types = 'songs',
}: ListMusicParams) =>
  apisauceInstance.get<ListMusicResponse>('/catalog/id/charts', {
    limit,
    offset,
    types,
  });

interface DetailMusicResponse {
  data: Array<{
    id: string;
    type: string;
    href: string;
    attributes: SongAttributes;
  }>;
}

export const getDetailMusic = ({id}: {id: string}) => {
  return apisauceInstance.get<DetailMusicResponse>(`/catalog/id/songs/${id}`);
};
