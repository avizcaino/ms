/**
 * Created by alexvizcaino on 14/9/16.
 */
import {HttpClient} from "aurelia-fetch-client";
import {autoinject} from "aurelia-dependency-injection";
import {IResourcesService} from "resources-service";
import {Resource} from "resources-model";
import {ResourceType} from "resources-model";

@autoinject
export class ResourcesServiceBase implements IResourcesService{
  protected resourcesUris: string[];

  constructor(private _httpClient: HttpClient){}

  getResourceByName(name: string): Promise<Resource[]>{
    let promises: Promise<any>[] = [];
    for(let resourceUri of this.resourcesUris){
      promises.push(this._httpClient.fetch(resourceUri + name + '.json')
        .then(r => r.json())
        .then(r => r.data)
        .catch(e => console.log(e)));
    }

    return Promise.all(promises)
      .then(data => {
        let resources: Resource[] = [];

        if(data[0])
          for(let resource of data[0].names){
            resources.push({
              type: ResourceType.person,
              data: resource
            })
          }

        if(data[1])
          for(let resource of data[1].movies){
            resources.push({
              type: ResourceType.film,
              data: resource
            })
          }

        return resources;
      });
  }

}
