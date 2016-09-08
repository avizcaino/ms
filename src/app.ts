import {Router, RouterConfiguration} from 'aurelia-router';
import {autoinject} from "aurelia-dependency-injection";
import {Redirect} from "aurelia-router";
import {UserInfo} from "login-model";
import {EventAggregator} from "aurelia-event-aggregator";
import {Events} from "./core/events/events";

@autoinject
export class App {
  constructor(private router: Router, private _ea: EventAggregator){
    this._ea.subscribe(Events.navigateToHome, this.navigateToHome.bind(this));
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.
    config.map([
      { route: ['', 'home'], name: 'home',      moduleId: 'routes/home/views/main',      nav: true, auth: true,  title: '' },
      { route: 'login',      name: 'login',     moduleId: 'routes/login/views/main',     nav: true, auth: false, title: 'Login' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, auth: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, auth: true, title: 'Child Router' }
    ]);

    this.router = router;
  }

  private navigateToHome(){
    this.router.navigate('home');
  }
}

@autoinject
class AuthorizeStep {
  constructor(private _userInfo: UserInfo){}
  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
      //var isLoggedIn = this._userInfo.isLoggedIn;// insert magic here;
      var isLoggedIn = true;
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
