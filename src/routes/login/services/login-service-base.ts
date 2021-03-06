/**
 * Created by alexvizcaino on 7/9/16.
 */
import {ILoginService} from "login-service";
import {Credentials} from "login-model";
import {HttpClient} from "aurelia-fetch-client";
import {autoinject} from "aurelia-dependency-injection";
import {UserInfo} from "login-model";

@autoinject
export class LoginServiceBase implements ILoginService{
  protected loginUri: string;
  protected userInfoUri: string;
  constructor(private _httpClient: HttpClient, private _userInfo: UserInfo){}

  login(credentials: Credentials): Promise<boolean>{
    return this._httpClient.fetch(this.loginUri)
      .then(r => r.json())
      .then(r => this.validateCredentials(r, credentials))
      .catch(e => console.log(e));
  }

  private validateCredentials(validCredentials: Credentials[], credentials: Credentials): boolean{
    this._userInfo.isLoggedIn = false;
    for(let c of validCredentials){
      if(c.username == credentials.username && c.password == credentials.password){
        this._userInfo.isLoggedIn = true;
        this._userInfo.username = credentials.username;
        break;
      }
    }

    return this._userInfo.isLoggedIn;
  }

  getUserInfo(username: string): Promise<UserInfo>{
    return this._httpClient.fetch(this.userInfoUri + username + '.json')
      .then(r => r.json())
      .then(r => {
        this._userInfo = r;
        this._userInfo.isLoggedIn = true;
        return this._userInfo;
      });
  }

  logout(): Promise<boolean>{
    this._userInfo.isLoggedIn = false;
    return Promise.resolve(true);
  }
}
