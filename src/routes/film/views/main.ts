/**
 * Created by alexvizcaino on 14/9/16.
 */
import {FilmService} from "film-service";
import {autoinject} from "aurelia-dependency-injection";
import {Film} from "film-model";
import {DelegateCommand, DelegateCommandVoid} from "../../../core/ui/command/command";
import {FilmActor} from "film-model";
import {EventAggregator} from "aurelia-event-aggregator";
import {Events} from "../../../core/events/events";
import {Dialog} from "dialog-model";
import {DialogAction} from "dialog-model";
import {DialogOptions} from "dialog-model";

@autoinject
export class FilmViewModel{
  public film: Film;
  public getActorInfoCommand: DelegateCommand<FilmActor>;
  public addToWatchlistCommand: DelegateCommand<Film>;
  public deleteFromWatchlistCommand: DelegateCommand<Film>;
  public openRaterCommand: DelegateCommandVoid;

  constructor(private _filmService: FilmService, private _ea: EventAggregator){
    this.getActorInfoCommand = new DelegateCommand<FilmActor>(this.getActorInfo.bind(this));
    this.addToWatchlistCommand = new DelegateCommand<Film>(this.addToWatchlist.bind(this));
    this.deleteFromWatchlistCommand = new DelegateCommand<Film>(this.deleteFromWatchlist.bind(this));
    this.openRaterCommand = new DelegateCommandVoid(this.openRater.bind(this));
  }

  activate(params){
    return this._filmService.getFilmById(params.filmId)
      .then(r => this.film = r);
  }

  private getActorInfo(actor: FilmActor){}

  private addToWatchlist(film: Film){
    this._ea.publish(Events.addFilmToWatchlist, film);
  }

  private deleteFromWatchlist(film: Film){
    this._ea.publish(Events.removeFilmFromWatchlist, film);
  }

  private callback(model){
    this.film.userRating = model.rating;
  }

  private openRater(){
    this._ea.publish(Events.openDialog, <Dialog>{
      title: 'Rate Movie',
      callback: this.callback.bind(this),
      options: <DialogOptions>{
        modal: true
      },
      content:{
        viewModel:'core/ui/elements/rater-dialog',
        model: {rating: this.film.userRating}
      },
      actions: <DialogAction[]>[{
        label: 'dialog.dismiss.label',
        command: 'dialog-dismiss'
      },{
        label: 'dialog.confirm.label',
        command: 'dialog-confirm'
      }]
    });
  }
}
