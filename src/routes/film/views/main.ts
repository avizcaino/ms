/**
 * Created by alexvizcaino on 14/9/16.
 */
import {FilmService} from "film-service";
import {autoinject} from "aurelia-dependency-injection";
import {Film} from "film-model";

@autoinject
export class FilmViewModel{
  public film: Film;

  constructor(private _filmService: FilmService){}

  activate(params){
    return this._filmService.getFilmById(params.filmId)
      .then(r => this.film = r);
  }
}
