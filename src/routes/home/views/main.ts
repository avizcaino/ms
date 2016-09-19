/**
 * Created by alexvizcaino on 8/9/16.
 */
import {DelegateCommandVoid} from "../../../core/ui/command/command";
import {autoinject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";
import {Events} from "../../../core/events/events";
import {UserInfo} from "login-model";
import {Subscription} from "aurelia-event-aggregator";
import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";
import {FilmService} from "film-service";
import {Film} from "film-model";
import {LoginService} from "login-service";
import {NotificationType} from "notification-model";

@autoinject
export class HomeViewModel{
  public navigateHomeCommand: DelegateCommandVoid;
  public logoutCommand: DelegateCommandVoid;
  private _subscribers: Subscription[] = [];

  constructor(private _router: Router, private _ea: EventAggregator, private _loginService: LoginService, public userInfo: UserInfo, private _filmService: FilmService){
    this.navigateHomeCommand = new DelegateCommandVoid(this.doNavigateHome.bind(this));
    this.logoutCommand = new DelegateCommandVoid(this.doLogout.bind(this));
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: '',                 name: 'empty',  moduleId: 'core/views/empty-view',      nav: true, auth: true,  title: '' },
      { route: 'film/:filmId',     name: 'film',   moduleId: 'routes/film/views/main',     nav: true, auth: true,  title: '', href: '#film' },
      { route: 'person/:personId', name: 'person', moduleId: 'routes/person/views/main',   nav: true, auth: true,  title: '', href: '#person' }
    ]);

    this._router = router;
  }

  activate(){
    this._subscribers.push(this._ea.subscribe(Events.search, this.doSearch.bind(this)));
    return this._loginService.getUserInfo(this.userInfo.username)
      .then(r => this.userInfo = r);
  }

  private doNavigateHome(){
    //this._ea.publish(Events.navigateToHome);
  }

  private doLogout(){
    this._ea.publish(Events.userLoggedOut);
  }

  private doSearch(searchString){
    return this._filmService.getFilmByName(searchString)
      .then((film: Film) => {
        if(film)
          this._router.navigateToRoute('film', {filmId: film.idIMDB})
        else
          this._ea.publish(Events.notify, {message: 'notification.not-found', type: NotificationType.Info});
      })
  }

  deactivate(){
    this._subscribers.forEach((subscriber) => {
      subscriber.dispose();
    })
  }
}
