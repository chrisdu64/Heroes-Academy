import { Action, createReducer, on } from '@ngrx/store';
import { Ability } from 'src/app/core/models/ability.interface';
import { deleteAbilitySuccess, getAbilitiesFailure, getAbilitiesSuccess } from '../actions/ability.actions';


export const abilityFeatureKey = 'abilities';

export const initialState: Ability[] = [];

export const abilityReducer = createReducer(
  initialState,
  on(getAbilitiesSuccess, (state, { abilities }) => abilities
    // ({
    //   ...state,
    //   abilities
    // })
  ),
  on(getAbilitiesFailure, (state) => initialState),
  // on(addAbilitySuccess, (state, { newAbility }) => {
  //   console.log("ds reducer:", state);

  //   // ability.id = state.length + 1;
  //   state.push(newAbility);
  //   return state
  // }),
  on(deleteAbilitySuccess, (state, { id }) => state.filter(ability => ability.id !== id)),

);
