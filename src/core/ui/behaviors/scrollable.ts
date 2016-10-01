/**
 * Created by alexvizcaino on 30/9/16.
 */
import {customAttribute} from "aurelia-templating";
import {autoinject} from "aurelia-dependency-injection";

@customAttribute('scrollable')
@autoinject
export class Scrollable{
  constructor(private _element: Element){}

  attached(){
    (<HTMLElement>this._element).style.maxHeight = '100%';
    (<HTMLElement>this._element).style.overflowY = 'scroll';
  }
}
