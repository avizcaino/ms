/**
 * Created by alexvizcaino on 14/9/16.
 */
declare module 'resources-model'{
  export interface Resource{
    type: ResourceType;
    data: any;
  }

  export const enum ResourceType{
    person = 1,
    film = 2
  }
}
