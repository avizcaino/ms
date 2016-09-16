/**
 * Created by alexvizcaino on 16/9/16.
 */
import {autoinject} from "aurelia-dependency-injection";
import {bindable} from "aurelia-templating";
import {customAttribute} from "aurelia-templating";

@customAttribute('background-image')
@autoinject
export class BackgroundImage{
  constructor(private _element:Element){}

  valueChanged(newValue){
    (<HTMLElement>this._element).style.backgroundImage = 'url(' + newValue +')';
  }
}
