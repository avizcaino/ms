/**
 * Created by alexvizcaino on 19/9/16.
 */
import {autoinject} from "aurelia-dependency-injection";
import {IWatchlistService} from "watchlist-service";
import {Film} from "film-model";
import {EventAggregator} from "aurelia-event-aggregator";
import {Events} from "../../../core/events/events";
import {NotificationType} from "notification-model";

@autoinject
export class WatchlistServiceBase implements IWatchlistService{
  private _watchlist: Film[] = [];

  constructor(private _ea: EventAggregator){}

  addFilm(film: Film): Promise<boolean>{
    let filmInWatchlist = (<any>this._watchlist).find((f: Film) => f.idIMDB == film.idIMDB);
    if(!filmInWatchlist){
      this._watchlist.push(film);
      film.inWatchlist = true;
      this._ea.publish(Events.notify, {message: 'watchlist.film-added', params: {film: film.title}, type: NotificationType.Success});
      return Promise.resolve(true);
    } else {
      return Promise.reject(null);
    }
  }

  removeFilm(film: Film): Promise<boolean>{
    let filmInWatchlist = (<any>this._watchlist).find((f: Film) => f.idIMDB == film.idIMDB);
    if(filmInWatchlist){
      this._watchlist.splice(this._watchlist.indexOf(film), 1);
      film.inWatchlist = false;
      this._ea.publish(Events.notify, {message: 'watchlist.film-removed', params: {film: film.title}, type: NotificationType.Success});
      return Promise.resolve(true);
    } else {
      return Promise.reject(null);
    }
  }

  getFilms(): Promise<Film[]>{
    return Promise.resolve(this._watchlist);
  }
}
