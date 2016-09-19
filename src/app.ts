import {Router, RouterConfiguration} from 'aurelia-router';
import {autoinject} from "aurelia-dependency-injection";
import {Redirect} from "aurelia-router";
import {UserInfo} from "login-model";
import {EventAggregator} from "aurelia-event-aggregator";
import {Events} from "./core/events/events";
import {LoginService} from "./routes/login/services/login-service-local";
import {NavigationInstruction} from "aurelia-router";
import * as path from 'aurelia-path';

@autoinject
export class App {
  constructor(private router: Router, private _ea: EventAggregator, private _loginService: LoginService){
    this._ea.subscribe(Events.userLoggedIn, this.onUserLoggedIn.bind(this));
    this._ea.subscribe(Events.userLoggedOut, this.onUserLoggedOut.bind(this));
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'MS';
    config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.
    config.map([
      { route: ['home'], name: 'home',      moduleId: 'routes/home/views/main',      nav: true, auth: true,  title: '' },
      { route: ['', 'login'],      name: 'login',     moduleId: 'routes/login/views/main',     nav: true, auth: false, title: 'Login' }
    ]);

    this.router = router;
  }

  private onUserLoggedIn(payload: any){
    let route = payload && payload.route && payload.route != '/' ? payload.route : 'home';
    if (payload && payload.queryString && payload.queryString.length > 0)
      route += '?' + payload.queryString;
    this.router.navigate(route, true);
  }

  private onUserLoggedOut(){
    this._loginService.logout()
      .then(r => this.router.navigate('login'));
  }
}

@autoinject
class AuthorizeStep {
  constructor(private _userInfo: UserInfo){}
  /*run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
      var isLoggedIn = this._userInfo.isLoggedIn;
      //var isLoggedIn = true;
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }*/

  run(navigationInstruction: NavigationInstruction, next){
    if(navigationInstruction.fragment == '/login'){
      if(this._userInfo.isLoggedIn)
        return next.cancel(new Redirect('home'));
    } else {
      if(!this._userInfo.isLoggedIn){
        var redirect = {
          route: navigationInstruction.fragment && navigationInstruction.fragment != '/' ? navigationInstruction.fragment : 'home',
          queryString: navigationInstruction.queryString
        };
        var queryString = path.buildQueryString(redirect);
        return next.cancel(new Redirect('login?' + queryString, null));
      }
    }
    return next();
  }
}
