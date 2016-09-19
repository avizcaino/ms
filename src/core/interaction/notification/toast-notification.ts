/**
 * Created by alexvizcaino on 16/9/16.
 */
import {EventAggregator} from "aurelia-event-aggregator";
import {Events} from "../../events/events";
import {autoinject} from "aurelia-dependency-injection";
import {Subscription} from "aurelia-event-aggregator";
import {Notification} from "notification-model";
import {NotificationType} from "notification-model";

@autoinject
export class ToastNotification{
  public notification: Notification;

  private _subscriptions: Subscription[] = [];

  constructor(private _ea: EventAggregator, private _element: Element){
    this._subscriptions.push(this._ea.subscribe(Events.notify, this.notify.bind(this)));
  }

  private notify(notification: Notification){
    this.notification = notification;
    (<any>this._element.querySelector('paper-toast')).open();
  }

  detached(){
    this._subscriptions.forEach(subscription => subscription.dispose());
  }
}

export class ToastTypeClassValueConverter{
  toView(type: NotificationType){
    switch(type){
      case NotificationType.Error:
        return 'error-toast';
      case NotificationType.Info:
        return 'info-toast';
      case NotificationType.Success:
        return 'success-toast';
    }
  }
}
