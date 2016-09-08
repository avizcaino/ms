/**
 * Created by alexvizcaino on 24/8/16.
 */
import {FrameworkConfiguration} from "aurelia-framework";
export function configure(fc:FrameworkConfiguration) {
  return new Promise(resolve =>{
    if(!(<any>window).Intl) {
      SystemJS.import('intl')
        .then(Intl => {
          (<any>window).Intl = Intl;
          resolve(true);
        })
        .catch(() => {
          alert('error on INTL load');
          resolve(false);
        });
    } else
      resolve(true)
  });
}
