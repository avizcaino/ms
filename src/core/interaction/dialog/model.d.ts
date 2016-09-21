/**
 * Created by alexvizcaino on 21/9/16.
 */
declare module 'dialog-model'{
  export interface Dialog{
    title: string;
    callback: (args) => void;
    options: DialogOptions;
    actions: DialogAction[];
  }

  export interface DialogAction{
    label: string;
    command: string;
  }

  export interface DialogOptions{
    modal: boolean;
  }
}
