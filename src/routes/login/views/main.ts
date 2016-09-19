/**
 * Created by alexvizcaino on 7/9/16.
 */
import {autoinject} from "aurelia-dependency-injection";
import {LoginService} from "login-service";
import {EventAggregator} from "aurelia-event-aggregator";
import {Events} from "../../../core/events/events";
import {DelegateCommandVoid} from "../../../core/ui/command/command";

@autoinject
export class LoginViewModel{
  public username: string = 'avizcaino';
  public password: string = 'test';
  public loginCommand: DelegateCommandVoid;
  private _target: any;

  constructor(private _loginService: LoginService, private _ea: EventAggregator){
    this.loginCommand = new DelegateCommandVoid(this.doLogin.bind(this), this.canExecuteLogin.bind(this));
  }

  activate(params){
    this._target = {
      route: params.route ? params.route : '',
      queryString: params.targetRoute ? params.queryString : null
    }
  }

  private doLogin(){
    this._loginService.login({username: this.username, password: this.password})
      .then(r => r ? this._ea.publish(Events.userLoggedIn, this._target) : null);
  }

  private canExecuteLogin(){
    return true;

    /**
     * TODO
     * Must disable button is username or password are null
     * --> return this.username != null && this.password != null;
     */
  }
}
