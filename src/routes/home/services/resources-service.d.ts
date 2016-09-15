/**
 * Created by alexvizcaino on 14/9/16.
 */
declare module 'resources-service'{
  import {Resource} from "resources-model";
  export interface IResourcesService{
    getResourceByName(name: string): Promise<Resource[]>;
  }

  export class ResourcesService{
    getResourceByName(name: string): Promise<Resource[]>;
  }
}
