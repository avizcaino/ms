/**
 * Created by alexvizcaino on 19/9/16.
 */
import {autoinject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";
import {WatchlistService} from "watchlist-service";
import {Film} from "film-model";

@autoinject
export class WatchlistViewModel{
  private _watchlist: Film[];

  constructor(private _ea: EventAggregator, private _watchlistService: WatchlistService){}

  activate(){
    return this._watchlistService.getFilms()
      .then(r => console.log(r));
  }
}
