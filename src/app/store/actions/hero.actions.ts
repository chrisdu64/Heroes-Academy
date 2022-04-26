import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Hero } from 'src/app/core/models/hero.interface';

export const getHeroes = createAction(
  '[Protected] Get Heroes'
);
export const getHeroesSuccess = createAction(
  '[Protected] Get Heroes Success',
  props<{ heroes: Hero[] }>()
);
export const getHeroesFailure = createAction(
  '[Protected] Get Heroes Failure',
  props<{ failureResponse: HttpErrorResponse }>()
);




