/**
 * Created by alexvizcaino on 21/9/16.
 */
export class ArrayToStringValueConverter{
  toView(array: any[], key: string){
    if(array){
      let str: string = '';
      array.forEach(a => str = str + a[key] + ', ');
      return str.substr(0, str.length - 2);
    } else return '';
  }
}
