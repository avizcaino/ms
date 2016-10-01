/**
 * Created by alexvizcaino on 30/9/16.
 */
import {autoinject} from "aurelia-dependency-injection";
import {customAttribute} from "aurelia-templating";
import {Router} from "aurelia-router";

@customAttribute('full-height')
@autoinject
export class FullHeight{
  constructor(private _element: Element, private _router: Router){}

  attached(value){
    if(this._element.tagName.toLowerCase() == 'router-view'){
      let toolbarHeight = document.querySelector('searcher-toolbar');
    }
  }
}
