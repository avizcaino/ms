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
  public username: string;
  public password: string;
  public loginCommand: DelegateCommandVoid;

  constructor(private _loginService: LoginService, private _ea: EventAggregator){
    this.loginCommand = new DelegateCommandVoid(this.doLogin.bind(this), this.canExecuteLogin.bind(this));
  }

  private doLogin(){
    this._loginService.login({username: this.username, password: this.password})
      .then(r => r ? this._ea.publish(Events.navigateToHome) : null);
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
