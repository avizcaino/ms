/**
 * Created by alexvizcaino on 15/9/16.
 */
declare module 'film-model'{
  export interface Film{
    title: string;
    originalTitle: string;
    year: number;
    releaseDate: Date;
    directors: Array<FilmPerson>;
    writers: Array<FilmPerson>;
    runtime: number;
    urlPoster: string;
    countries: string[];
    languages: string[];
    genres: string[];
    plot: string;
    simplePlot: string;
    actors: Array<FilmActor>;
    akas: string[];
    idIMDB: string;
    urlIMDB: string;
    business: Business;
    filmingDates: string[];
    copyrightHolder: string;
    technical: Technical;
    rating: number;
    metascore: number;
    filmingLocations: string[];
    rated: string;
    trailer: Trailer;
    movieTrivia: string[];
    awards: Award[];
    votes: number;
    type: MediaType;
    inWatchlist: boolean;
  }
  
  export interface FilmPerson{
    name: string;
    id: string;
  }
  
  export interface FilmActor{
    actorName: string;
    urlProfile: string;
    urlPhoto: string;
    actorId: string;
    character: string;
    urlCharacter: string;
    main: boolean;
  }
  
  export interface Business{
    budget: string;
    openingWeekend: string;
    gross: string;
    weekendGross: string;
    admissions: string;
    productionDates: string;
  }
  
  export interface Technical{
    runtime: string[];
    soundMix: string;
    color: string[];
    aspectRatio: string;
    camera: string[];
    laboratory: string;
    filmLength: string;
    negativeFormat: string;
    cinematographicProcess: string;
    printedFilmFormat: string;
  }

  export interface Trailer{
    title: string;
    description: string;
    relatedTitles: Title[];
    videoURL: string;
    type: string;
    duration: string;
    qualities: TrailerQuality[];
    contentRating: string;
  }

  export interface Title{
    name: string;
    id: string;
  }

  export interface TrailerQuality{
    quality: string;
    videoURL: string;
  }

  export interface Award{}

  export const enum MediaType{
    Movie = 1
  }
}
