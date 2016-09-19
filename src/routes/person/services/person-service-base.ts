/**
 * Created by alexvizcaino on 19/9/16.
 */
import {IPersonService} from "person-service";
import {autoinject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-fetch-client";
import {Person} from "person-model";

@autoinject
export class PersonServiceBase implements IPersonService{
  protected personUri: string;

  constructor(private _httpClient: HttpClient){}

  getPersonById(id: string): Promise<Person>{
    return this.queryPerson(id);
  }

  getPersonByName(name: string): Promise<Person>{
    return this.queryPerson(name);
  }

  protected queryPerson(name:string): Promise<Person>{
    return null;
  }

  protected adaptPerson(rawPerson: any): Person{
    return null;
  }

  protected getQueryUri(name?: string): Request | string{
    if(name)
      return this.personUri + name + '.json';
    else
      return this.personUri + 'persons.json';
  }
}
