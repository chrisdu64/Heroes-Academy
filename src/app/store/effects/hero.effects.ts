import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HeroesService } from 'src/app/core/services/heroes.service';
import { getHeroes, getHeroesFailure, getHeroesSuccess } from '../actions/hero.actions';



@Injectable()
export class HeroEffects {

  getHeroes$ = createEffect(() => this.actions$.pipe(
    ofType(getHeroes),
    switchMap(action => this.heroesService.getHeroes$().pipe(
      map(heroes => getHeroesSuccess({ heroes: heroes })),
      catchError(failureResponse => of(getHeroesFailure({ failureResponse })))
    ))
  ))

  constructor(
    private actions$: Actions,
    private heroesService: HeroesService) { }

}
