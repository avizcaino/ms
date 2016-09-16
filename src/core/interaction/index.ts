/**
 * Created by alexvizcaino on 24/8/16.
 */
import {FrameworkConfiguration} from "aurelia-framework";
export function configure(fc:FrameworkConfiguration) {
  fc.globalResources([
    './notification/toast-notification']);
}
