/**
 * Created by alexvizcaino on 7/9/16.
 */
import {LoginServiceBase} from "./login-service-base";
export class LoginService extends LoginServiceBase{
  protected loginUri: string = 'test-data/login/credentials.json';
  protected userInfoUri: string = 'test-data/login/user-info/'
}
