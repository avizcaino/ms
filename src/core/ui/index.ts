/**
 * Created by alexvizcaino on 24/8/16.
 */
import {FrameworkConfiguration} from "aurelia-framework";
export function configure(fc:FrameworkConfiguration) {
  fc.globalResources([
    './converters/array-converters',
    './command/command-ext',
    './behaviors/on-enter',
    './behaviors/background-image',
    './elements/searcher-toolbar']);
}
