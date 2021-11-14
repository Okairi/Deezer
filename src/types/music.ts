export interface Music {
  id: number;
  title: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_medium: string;
    cover_big: string;
  };
  preview: string;
}
