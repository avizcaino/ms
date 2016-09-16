/**
 * Created by alexvizcaino on 16/9/16.
 */
declare module 'notification-model'{
  export interface Notification{
    type: NotificationType;
    message: string;
  }

  export const enum NotificationType{
    Error = 1,
    Info = 2,
    Success = 3
  }
}
