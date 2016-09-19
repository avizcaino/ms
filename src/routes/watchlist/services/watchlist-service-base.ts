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
    if(this._watchlist.indexOf(film) == -1){
      this._watchlist.push(film);
    }
    this._ea.publish(Events.notify, {message: 'watchlist.film-added', params: {film: film.title}, type: NotificationType.Success});
    return Promise.resolve(true);
  }

  getFilms(): Promise<Film[]>{
    return Promise.resolve(this._watchlist);
  }
}
