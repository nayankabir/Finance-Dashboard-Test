import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Card} from "../model/card";
import {Store} from "@ngrx/store";
import {ReportCardsActions} from "../actions/report-cards-actions";
import {CardCurrencyPipe} from "../shared/card-currency-pipe";
import {CardPercentPipe} from "../shared/card-percent-pipe";

@Component({
  selector: 'app-report-cards',
  templateUrl: 'report-cards.component.html',
  styleUrls: ['report-cards.component.scss'],
  pipes: [CardCurrencyPipe, CardPercentPipe]
})
export class ReportCardsComponent implements OnInit{

  @Input()
  private cards;
  @Input()
  private hasLeftOffset: boolean;
  @Input()
  private selectedTimeFilter: string;
  @Input()
  private currencyFormatter: string;
  private cardsSpritePath = require("../shared/cards-sprite.svg");

  constructor(private store: Store<any>) {
  }

  ngOnInit () {
  }

  onMouseEnter(card) {
    if (!card.noData) {
      card.showMetricDetails = true;
    }
  }

  onMouseLeave(card) {
    card.showMetricDetails = false;
  }

  onPeriodEnter(period) {
    period.hoveredUp = period.up;
    period.hoveredDown = !period.up;
  }

  onPeriodLeave(period) {
    period.hoveredUp = period.hoveredDown = false;
  }

  seeDetails(card: Card) {
    this.store.dispatch(ReportCardsActions.addBreadcrumb({"text": card.name, "active": true}));
    this.store.dispatch(ReportCardsActions.showDetails(card));
  }

}
