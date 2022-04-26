import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TechniquesService } from 'src/app/core/services/techniques.service';
import { getTechniques, getTechniquesFailure, getTechniquesSuccess } from '../actions/technique.actions';



@Injectable()
export class TechniqueEffects {
  getTechniques$ = createEffect(() => this.actions$.pipe(
    ofType(getTechniques),
    switchMap(action => this.techniquesService.getTechniques$().pipe(
      map(techniques => getTechniquesSuccess({ techniques: techniques })),
      catchError(failureResponse => of(getTechniquesFailure({ failureResponse })))
    )),
  ));

  // getAbilities$ = createEffect(() => this.actions$.pipe(
  //   ofType(getAbilities),
  //   switchMap(action => this.abilitiesService.getAbilities$().pipe(
  //     map(abilities => getAbilitiesSuccess({ abilities: abilities })),
  //     catchError(failureResponse => of(getAbilitiesFailure({ failureResponse })))
  //   ))
  // ))




  constructor(
    private actions$: Actions,
    private techniquesService: TechniquesService) { }

}
