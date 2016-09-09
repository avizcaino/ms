/**
 * Created by alexvizcaino on 8/9/16.
 */
import {DelegateCommandVoid} from "../../../core/ui/command/command";
import {autoinject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";
import {Events} from "../../../core/events/events";
import {UserInfo} from "login-model";
import {LoginService} from "../../login/services/login-service-local";

@autoinject
export class HomeViewModel{
  public navigateHomeCommand: DelegateCommandVoid;
  public logoutCommand: DelegateCommandVoid;

  constructor(private _ea: EventAggregator, private _loginService: LoginService, public userInfo: UserInfo){
    this.navigateHomeCommand = new DelegateCommandVoid(this.doNavigateHome.bind(this));
    this.logoutCommand = new DelegateCommandVoid(this.doLogout.bind(this));
  }

  activate(){
    return this._loginService.getUserInfo(this.userInfo.username)
      .then(r => this.userInfo = r);
  }

  private doNavigateHome(){
    this._ea.publish(Events.navigateToHome);
  }

  private doLogout(){
    this._ea.publish(Events.logout);
  }
}
