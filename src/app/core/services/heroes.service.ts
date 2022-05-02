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
      map(() => formValue),
      switchMap(newHero => this.http.post<Hero>(environment.apiUrl + "/heroes/", newHero)),
    )
  }

  deleteHero$(idHero: number): Observable<Hero[]> {
    return this.http.delete<any>(environment.apiUrl + `/heroes/${idHero}`)
  }

}


