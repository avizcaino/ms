/**
 * Created by alexvizcaino on 19/9/16.
 */
declare module 'person-service'{
  import {Person} from "person-model";
  export interface IPersonService{
    getPersonByName(name: string): Promise<Person>;
    getPersonById(id: string): Promise<Person>;
  }

  export class PersonService implements IPersonService{
    getPersonByName(name: string): Promise<Person>;
    getPersonById(id: string): Promise<Person>;
  }
}
