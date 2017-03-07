import {Card} from "../../report-cards/model/card";
export class MetricsModel {
  loaded: boolean;
  filterParams: string;
  selectedTimeFilter: string;
  cards: Array<Card>;
}
