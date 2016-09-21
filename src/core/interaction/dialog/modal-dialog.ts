/**
 * Created by alexvizcaino on 21/9/16.
 */
import {autoinject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";
import {Dialog} from "dialog-model";
import {Subscription} from "aurelia-event-aggregator";
import {Events} from "../../events/events";
import {DelegateCommand} from "../../ui/command/command";

@autoinject
export class ModalDialog{
  public model: Dialog;
  public dialogCommand: DelegateCommand<string>;
  public rate: number = 10;
  private _subscriptions: Subscription[] = [];

  constructor(private _ea: EventAggregator, private _element: Element){
    this._subscriptions.push(this._ea.subscribe(Events.openDialog, this.openDialog.bind(this)));
    this.dialogCommand = new DelegateCommand<string>(this.executeCommand.bind(this));
  }

  private openDialog(model){
    this.model = model;
    (<any>this._element.querySelector('paper-dialog')).open();
  }

  private executeCommand(command: string){
    switch(command){
      case 'dialog-dismiss':
        (<any>this._element.querySelector('paper-dialog')).close();
        break;
      case 'dialog-confirm':
        this.model.callback(this.rate);
        (<any>this._element.querySelector('paper-dialog')).close();
    }
  }

  detached(){
    this._subscriptions.forEach(subscription => subscription.dispose());
  }
}
