import {
  ActionReducerMap
} from '@ngrx/store';
import { Ability } from '../core/models/ability.interface';
import { Hero } from '../core/models/hero.interface';
import { Technique } from '../core/models/technique.interface';
import { abilityReducer } from './reducers/ability.reducer';
import { heroReducer } from './reducers/hero.reducer';
import { techniqueReducer } from './reducers/technique.reducer';


export interface AppState {
  'heroes': Hero[],
  'abilities': Ability[],
  'techniques': Technique[]
  //  on peut écrire les propriètés sans les simple quote
}

export const reducers: ActionReducerMap<AppState> = {
  heroes: heroReducer,
  abilities: abilityReducer,
  techniques: techniqueReducer,
};
