/**
 * Created by alexvizcaino on 15/9/16.
 */
import {IFilmService} from "film-service";
import {Film} from "film-model";
import {autoinject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-fetch-client";
import {MediaType} from "film-model";

@autoinject
export class FilmServiceBase implements IFilmService{
  protected filmUri: string;
  private _cachedFilm: Film;
  private _getFilmByNamePromise: Promise<Film>;

  constructor(private _httpClient: HttpClient){}

  getFilmByName(name: string): Promise<Film>{
    if(!this._getFilmByNamePromise)
      this._getFilmByNamePromise = this.queryFilm(name);
    return this._getFilmByNamePromise
      .then(() => this._cachedFilm);
  }

  private queryFilm(name: string): Promise<Film>{
    return this._httpClient.fetch(this.getQueryUri(name))
      .then(r => r.json())
      .then(r => this.adaptFilm(r))
      .then(r => this._cachedFilm = r);
  }

  private adaptFilm(rawFilms: any): Film{
    let film: Film = <any>{};
    let data = rawFilms.data.movies[0];
    for(let prop in data){
      if(prop == 'releaseDate'){
        film[prop] = new Date(data[prop]);
      }
      else if(prop == 'year' || prop == 'runtime' || prop == 'rating' || prop == 'metascore' || prop == 'votes'){
        film[prop] = parseInt(data[prop]);
      }
      else if(prop == 'type'){
        if(data[prop] == 'Movie')
          film[prop] = MediaType.Movie;
      }
      else
        film[prop] = data[prop];
    }

    return film;
  }

  private getQueryUri(name?: string): Request | string{
    if(name)
      return this.filmUri + name + '.json';
    else
      return this.filmUri + 'films.json';
  }
}
