/**
 * Created by alexvizcaino on 7/9/16.
 */
declare module 'login-service'{
  import {Credentials} from "login-model";
  export interface ILoginService{
    login(credentials: Credentials): Promise<boolean>;
    logout(): Promise<boolean>;
  }

  export class LoginService{
    login(credentials: Credentials): Promise<boolean>;
    logout(): Promise<boolean>;
  }
}
