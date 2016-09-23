/**
 * Created by alexvizcaino on 19/9/16.
 */
declare module 'watchlist-service'{
  import {Film} from "film-model";
  export interface IWatchlistService{
    addFilm(film: Film): Promise<boolean>;
    removeFilm(film: Film): Promise<boolean>;
    getFilms(): Promise<Film[]>;
  }

  export class WatchlistService{
    addFilm(film: Film): Promise<boolean>;
    removeFilm(film: Film): Promise<boolean>;
    getFilms(): Promise<Film[]>;
  }
}
