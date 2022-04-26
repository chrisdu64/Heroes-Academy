import { Action, createReducer, on } from '@ngrx/store';
import { Hero } from 'src/app/core/models/hero.interface';
import { getHeroesFailure, getHeroesSuccess } from '../actions/hero.actions';


export const heroFeatureKey = 'heroes';

export const initialState: Hero[] = [];

export const heroReducer = createReducer(
  initialState,
  on(getHeroesSuccess, (state, { heroes }) => heroes),
  on(getHeroesFailure, (state) => initialState)

);
