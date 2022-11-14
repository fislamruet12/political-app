

export type SongRoot = {
    id: number;
    artistName: string;
    country: string;
    gender: string;
    image: string;
    album: number;
    mode: number;
    root: number;
}
export type Song = {
    id: {
        id: {
            id: string;
            title: string;
            url: string;
        }
    }
}