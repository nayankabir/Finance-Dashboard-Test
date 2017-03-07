export class PageMainMetricConstant {

  public static get APPLY_FILTERS(): string {
    return "APPLY_FILTERS";
  }

  public static get METRICS_LOADED(): string {
    return "METRICS_LOADED";
  }

  public static getMetricName(id): string {
    let metricMap = {
      "m_pos_Amount_Diff": "POS $",
      "m_pos_Amount_Prct": "POS $",
      "m_pos_Quantity_Diff": "POS Units",
      "m_pos_Quantity_Prct": "POS Units",
      "m_rvs_Amount_Diff": "RVS $",
      "m_rvs_Amount_Prct": "RVS $",
      "m_rvs_Quantity_Diff": "Shipment Qty",
      "m_rvs_Quantity_Prct": "Shipment Qty",
      "m_customer_Count_Diff": "Customer Count",
      "m_customer_Count_Prct": "Customer Count"
    };

    return metricMap[id];
  }

  public static getMetricCurrSymbol(id): string {
    let currencyMap = {
      "m_pos_Quantity": "",
      "m_rvs_Quantity": "",
      "m_customer_Count": "",
      "m_pos_Amount": "$",
      "m_rvs_Amount": "$"
    };
    return currencyMap[id];
  }

  public static getSelectedTimeFilter(id): string {
    let periodToFilterMap = {
      "Yesterday": "1",
      "WTD": "2",
      "MTD": "3",
      "QTD": "4",
      "YTD": "5"
    };
    return periodToFilterMap[id];
  }

  public static getSelectedCurrencyFilter(id): string {
    let currencyMap = {
      "1": "M",
      "2": "K",
      "3": "F"
    };
    return currencyMap[id];
  }
}
