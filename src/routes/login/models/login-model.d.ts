/**
 * Created by alexvizcaino on 7/9/16.
 */
declare module 'login-model'{
  export interface Credentials{
    username: string;
    password: string;
  }

  export interface UserInfo{
    username: string;
    fullName: string;
    profilePic: string;
    isLoggedIn: boolean;
  }
}
