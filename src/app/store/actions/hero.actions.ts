import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Hero } from 'src/app/core/models/hero.interface';

export const UPDATE_HERO_ACTION = '[Protected] Update Hero';
export const UPDATE_HERO_SUCCESS = '[Protected] Update Hero Success';

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
// create
export const addHero = createAction(
  '[Protected] Add Hero',
  props<{ newHero: Hero }>()
);
export const addHeroFailure = createAction(
  '[Protected] Add Hero Failure',
  props<{ failureResponse: HttpErrorResponse }>()
);
// update
export const updateHero = createAction(
  UPDATE_HERO_ACTION,
  props<{ updatedHero: Hero }>()
);
export const updateHeroSuccess = createAction(
  UPDATE_HERO_SUCCESS,
  props<{ updatedHero: Hero }>()
);
export const updateHeroFailure = createAction(
  '[Protected] Update Hero Failure',
  props<{ failureResponse: HttpErrorResponse }>()
);
// delete
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