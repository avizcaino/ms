/**
 * Created by alexvizcaino on 15/9/16.
 */
import {PersonServiceBase} from "./person-service-base";
export class FilmService extends PersonServiceBase{
  protected filmUri: string = 'test-data/persons/';
}
