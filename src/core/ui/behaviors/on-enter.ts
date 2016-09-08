import {customAttribute} from "aurelia-templating";
import {bindable} from "aurelia-templating";
import {autoinject} from "aurelia-dependency-injection";
import {TaskQueue} from "aurelia-task-queue";

@customAttribute('on-enter')
@autoinject
export class OnEnterExtension{
  @bindable target: string;
  @bindable targetEvent: string = 'click';
  @bindable raisingKeys: Array<any> = [{'key': 'enter', 'keyCode': 13}];

  private onKeyDownHandler: any;
  private _targetElement: HTMLElement;

  private getTargetElement(){
    if(!this._targetElement)
      this._targetElement = document.getElementById(this.target);
    return this._targetElement;
  }
  constructor(private _element: Element, private _taskQueue: TaskQueue){
    this.onKeyDownHandler = this.onKeyDown.bind(this);
  }

  public attached(){
    this._element.addEventListener('keydown',this.onKeyDownHandler);
    this.getTargetElement();
  }

  public detached(){
    this._element.removeEventListener('keydown', this.onKeyDownHandler);
  }

  private onKeyDown(evt){
    var keys = this.raisingKeys.filter(x => x.keyCode == evt.which);
    if(keys.length){
      let targetElement = this.getTargetElement();
      if(targetElement){
       this._taskQueue.queueTask(() =>{
          targetElement.dispatchEvent(new Event(this.targetEvent));
          (<HTMLElement>this._element).blur();
          targetElement.focus();
       });
      }
    }
  }
}
