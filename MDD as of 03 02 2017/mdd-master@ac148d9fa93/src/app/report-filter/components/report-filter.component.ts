import {Component, OnInit, Input, ChangeDetectionStrategy} from "@angular/core";
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import {ACCORDION_DIRECTIVES, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';
import {ReportFilterService} from "../shared/report-filter.service";
import {Store} from "@ngrx/store";
import {ReportFiltersActions} from "../actions/report-filters-actions";
import {ReportFilterConstant} from "../constants/report-filter-constant";

@Component({
  selector: 'app-report-filter',
  templateUrl: 'report-filter.component.html',
  styleUrls: ['report-filter.component.scss'],
  directives: [ACCORDION_DIRECTIVES, DROPDOWN_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ReportFilterComponent implements OnInit {

  @Input()
  private topFilters;
  @Input()
  private filterData;
  private filterSpritePath = require("../shared/filter-sprite.svg");
  private budgetSelected;

  private status: Object = {
    isOpen: false
  };

  constructor(private filterService: ReportFilterService,
              private store: Store<any>) {
  }

  ngOnInit() {

  }

  isBudgetSelected(id) {
    let result;
    let isRegionFilter = (id === ReportFilterConstant.REGION_FILTER_ID);
    result = this.budgetSelected && isRegionFilter;
    return result;
  }

  onMenuSelect(filterGroup, option) {
    filterGroup.selectedOption = option;
    this.budgetSelected = (option.use === ReportFilterConstant.BUDGET_VALUE);
  }

  clearFilters() {
    let filterModel = this.filterService.getFilterData(this.filterService.getInitialFilters());
    this.store.dispatch(ReportFiltersActions.filtersReady(filterModel));

    //Apply default filters
    this.applyFilter();
  }

  saveFilters() {

  }

  applyFilter() {
    let filterParams = this.filterService.getParams(this.topFilters);
    let selectedTimeFilter = this.filterService.getSelectedTimePeriod(this.topFilters);
    this.store.dispatch(ReportFiltersActions.applyFilters({
      filterParams: filterParams,
      selectedTimeFilter: selectedTimeFilter,
      formatterId: this.topFilters[0].selectedOption.use
    }));
  }

}
