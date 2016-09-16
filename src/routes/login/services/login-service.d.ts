/**
 * Created by alexvizcaino on 7/9/16.
 */
declare module 'login-service'{
  import {UserInfo} from "login-model";
  import {Credentials} from "login-model";
  export interface ILoginService{
    login(credentials: Credentials): Promise<boolean>;
    logout(): Promise<boolean>;
    getUserInfo(username: string): Promise<UserInfo>;
  }

  export class LoginService implements ILoginService{
    login(credentials: Credentials): Promise<boolean>;
    logout(): Promise<boolean>;
    getUserInfo(username: string): Promise<UserInfo>;
  }
}
