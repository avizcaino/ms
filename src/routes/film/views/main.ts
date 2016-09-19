/**
 * Created by alexvizcaino on 14/9/16.
 */
import {FilmService} from "film-service";
import {autoinject} from "aurelia-dependency-injection";
import {Film} from "film-model";
import {DelegateCommand} from "../../../core/ui/command/command";
import {FilmActor} from "film-model";
import {EventAggregator} from "aurelia-event-aggregator";
import {Events} from "../../../core/events/events";

@autoinject
export class FilmViewModel{
  public film: Film;
  public getActorInfoCommand: DelegateCommand<FilmActor>;
  public addToWatchlistCommand: DelegateCommand<Film>;

  constructor(private _filmService: FilmService, private _ea: EventAggregator){
    this.getActorInfoCommand = new DelegateCommand<FilmActor>(this.getActorInfo.bind(this));
    this.addToWatchlistCommand = new DelegateCommand<Film>(this.addToWatchlist.bind(this));
  }

  activate(params){
    return this._filmService.getFilmById(params.filmId)
      .then(r => this.film = r);
  }

  private getActorInfo(actor: FilmActor){}

  private addToWatchlist(film: Film){
    this._ea.publish(Events.addFilmToWatchlist, film);
  }
}
