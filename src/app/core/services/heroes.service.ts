import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  constructor(private http: HttpClient) { }

  getHeroes$(): Observable<Hero[]> {
    return this.http.get<Hero[]>(environment.apiUrl + '/heroes');
  }

  addHero$(formValue: { name: string, description: string, myImg: string }): Observable<Hero> {

    return this.getHeroes$().pipe(
      map(heroes => [...heroes].sort((a: Hero, b: Hero) => a.id - b.id)),
      map(sortedHeroes => sortedHeroes[sortedHeroes.length - 1]),
      map(previousHero => ({
        ...formValue,
        id: previousHero.id + 1
      })),
      switchMap(newHero => this.http.post<Hero>(environment.apiUrl + "/heroes/", newHero)),
    )
  }

  deleteHero$(idHero: number): Observable<Hero[]> {
    return this.http.delete<any>(environment.apiUrl + `/heroes/${idHero}`)
  }

}


