import { Injectable } from '@angular/core';
import {Card} from "../../report-cards/model/card";

@Injectable()
export class PageChartMetricsService {

  constructor() { }

  getMetricById(id: string): Card {
    let reportCards: Array<Card> = [
      {
        id: "1",
        up: true,
        name: "POS $",
        showMetricDetails: false,
        periods: [
          {
            "name": "Week to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Month to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Quarter to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          }
        ]
      },
      {
        id: "2",
        up: true,
        name: "POS Units",
        showMetricDetails: false,
        periods: [
          {
            "name": "Week to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Month to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Quarter to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          }
        ]
      },
      {
        id: "3",
        up: true,
        name: "RGM $",
        showMetricDetails: false,
        periods: [
          {
            "name": "Week to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Month to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Quarter to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          }
        ]
      },
      {
        id: "4",
        up: true,
        name: "RGM %",
        showMetricDetails: false,
        periods: [
          {
            "name": "Week to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Month to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Quarter to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          }
        ]
      },
      {
        id: "5",
        up: false,
        name: "POS Price Impact $",
        showMetricDetails: false,
        periods: [
          {
            "name": "Week to Day:",
            "up": false,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Month to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Quarter to Day:",
            "up": false,
            "value": "781",
            "pct": "12%"
          }
        ]
      },
      {
        id: "6",
        up: false,
        name: "POS Price Impact %",
        showMetricDetails: false,
        periods: [
          {
            "name": "Week to Day:",
            "up": false,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Month to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Quarter to Day:",
            "up": false,
            "value": "781",
            "pct": "12%"
          }
        ]
      },
      {
        id: "7",
        up: false,
        name: "POS MIX Impact $",
        showMetricDetails: false,
        periods: [
          {
            "name": "Week to Day:",
            "up": false,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Month to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Quarter to Day:",
            "up": false,
            "value": "781",
            "pct": "12%"
          }
        ]
      },
      {
        id: "8",
        up: true,
        name: "POS MIX Impact %",
        showMetricDetails: false,
        periods: [
          {
            "name": "Week to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Month to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          },
          {
            "name": "Quarter to Day:",
            "up": true,
            "value": "781",
            "pct": "12%"
          }
        ]
      }
    ];

    return reportCards.find(card => {
      return card.id === id;
    });
  }

}
