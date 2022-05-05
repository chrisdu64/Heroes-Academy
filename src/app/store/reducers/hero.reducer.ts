import { createReducer, on } from '@ngrx/store';
import { Hero } from 'src/app/core/models/hero.interface';
import { DeleteHeroSuccess, getHeroesFailure, getHeroesSuccess, updateHeroSuccess } from '../actions/hero.actions';


export const heroFeatureKey = 'heroes';

export const initialState: Hero[] = [];

export const heroReducer = createReducer(
  initialState,
  on(getHeroesSuccess, (state, { heroes }) => heroes),
  on(getHeroesFailure, (state) => initialState),
  // on(updateHeroSuccess, (state, action) => {
  //   const heroUpdated = state.map((hero) => {
  //     return action.updatedHero.id === hero.id ? action.updatedHero : hero
  //   });
  //   return { ...state, hero: heroUpdated }
  // }),
  on(DeleteHeroSuccess, (state, { id }) => state.filter(hero => hero.id !== id))

);
