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
export const addHero = createAction(
  '[Protected] Add Heroes Success',
  props<{ newHero: Hero }>()
);
export const addHeroFailure = createAction(
  '[Protected] Add Heroes Failure',
  props<{ failureResponse: HttpErrorResponse }>()
);

export const DeleteHero = createAction(
  '[Protected] Delete Hero',
  props<{ id: number }>()
)
export const DeleteHeroSuccess = createAction(
  '[Protected] Delete Hero',
  props<{ id: number }>()
)
export const DeleteHeroError = createAction(
  '[Protected] Delete Hero Error',
  props<{ error: HttpErrorResponse }>()
)