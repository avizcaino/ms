/**
 * Created by alexvizcaino on 15/9/16.
 */
declare module 'film-service'{
  import {Film} from "film-model";
  export interface IFilmService{
    getFilmByName(name: string): Promise<Film>;
  }

  export class FilmService implements IFilmService{
    getFilmByName(name: string): Promise<Film>;
  }
}
