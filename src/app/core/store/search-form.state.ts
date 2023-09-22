import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { SearchForm } from './../../interfaces/search-form';
import { APIRegion } from './../../api/hotels/region.model';

export class SetSearchFormData {
  static readonly type = '[SearchForm] Set Data';
  constructor(public payload: SearchForm) {}
}

export interface SearchFormModel {
  destination?: APIRegion;
  checkIn: Date;
  checkOut: Date;
  guests: number;
}

@Injectable()
@State<SearchFormModel>({
  name: 'searchForm',
  defaults: {
    destination: null,
    checkIn: null,
    checkOut: null,
    guests: null
  }
})
export class SearchFormState {
  @Action(SetSearchFormData)
  setSearchFormData(ctx: StateContext<SearchForm>, action: SetSearchFormData) {
    ctx.patchState(action.payload);
  }
}
