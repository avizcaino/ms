/**
 * Created by alexvizcaino on 14/9/16.
 */
import {DelegateCommandVoid, DelegateCommand} from "../command/command";
import {bindable} from "aurelia-templating";
import {autoinject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";
import {Events} from "../../events/events";
@autoinject
export class SearcherToolbar{
  public toggleSearcherCommand: DelegateCommandVoid;
  public clearSearcherCommand: DelegateCommandVoid;
  public searchCommand: DelegateCommandVoid;
  public searcher: boolean = false;
  public searchString: string = '';

  constructor(private _ea: EventAggregator){
    this.toggleSearcherCommand = new DelegateCommandVoid(this.doToggleSearcher.bind(this));
    this.clearSearcherCommand = new DelegateCommandVoid(this.doClearSearcher.bind(this));
    this.searchCommand = new DelegateCommandVoid(this.doSearch.bind(this));
  }

  private doToggleSearcher(){
    this.searchString = '';
    this.searcher = !this.searcher;
  }

  private doClearSearcher(){
    this.searchString = '';
  }

  private doSearch(){
    this._ea.publish(Events.search, this.searchString);
  }
}
