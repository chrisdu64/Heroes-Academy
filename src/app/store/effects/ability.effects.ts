import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AbilitiesService } from 'src/app/core/services/abilities.service';
import { deleteAbility, deleteAbilityError, deleteAbilitySuccess, getAbilities, getAbilitiesFailure, getAbilitiesSuccess } from '../actions/ability.actions';



@Injectable()
export class AbilityEffects {

  getAbilities$ = createEffect(() => this.actions$.pipe(
    ofType(getAbilities),
    switchMap(_ => this.abilitiesService.getAbilities$().pipe(
      map(abilities => getAbilitiesSuccess({ abilities: abilities })),
      catchError(failureResponse => of(getAbilitiesFailure({ failureResponse })))
    ))
  ))

  deleteAbility$ = createEffect(() => this.actions$.pipe(
    ofType(deleteAbility),
    switchMap(action => this.abilitiesService.deleteAbility$(action.heroId).pipe(
      map(_ => deleteAbilitySuccess({ heroId: action.heroId })),
      catchError(() => of(deleteAbilityError))
    )),
  ));

  constructor(
    private actions$: Actions,
    private abilitiesService: AbilitiesService,) { }

}
