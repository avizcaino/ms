/**
 * Created by alexvizcaino on 15/9/16.
 */
import {IFilmService} from "film-service";
import {Film} from "film-model";
import {autoinject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-fetch-client";
import {MediaType} from "film-model";
import {EventAggregator} from "aurelia-event-aggregator";

@autoinject
export class FilmServiceBase implements IFilmService{
  protected filmUri: string;
  private _cachedFilm: Film;

  constructor(private _httpClient: HttpClient, private _ea: EventAggregator){}

  getFilmById(id: string): Promise<Film>{
    if(this._cachedFilm && this._cachedFilm.idIMDB == id)
      return Promise.resolve(this._cachedFilm);
    else{
      return this._httpClient.fetch(this.getQueryUri(id))
        .then(r => r.json())
        .then(r => this.adaptFilm(r))
        .then(r => this._cachedFilm = r)
        .catch(e => console.log(e));
    }
      //return Promise.reject('film.service.film-not-found');
  }

  getFilmByName(name: string): Promise<Film>{
    return this.queryFilm(name);
  }

  protected queryFilm(name: string): Promise<Film>{
    return this._httpClient.fetch(this.getQueryUri(name))
      .then(r => r.json())
      .then(r => this.adaptFilm(r))
      .then(r => this._cachedFilm = r)
      .catch(e => console.log(e));
  }

  protected adaptFilm(rawFilm: any): Film{
    let film: Film = <any>{};
    let data = (<any>rawFilm.data).movies[0];
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

  protected getQueryUri(name?: string): Request | string{
    if(name)
      return this.filmUri + name + '.json';
    else
      return this.filmUri + 'films.json';
  }
}
