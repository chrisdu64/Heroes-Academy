import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
  // updateHero$(hero: Hero) {
  //   const heroData = { [hero.id]: { name: hero.name, description: hero.description, myImg: hero.myImg }, };
  //   return this.http.patch(environment.apiUrl + `/heroes/${hero.id}`, heroData)
  // }
  updateHero$(formValue: { id: number, name: string, description: string, myImg: string }): Observable<Hero> {
    return this.getHeroes$().pipe(
      map(() => formValue),
      switchMap(updatedHero => this.http.patch<Hero>(environment.apiUrl + `/heroes/${formValue.id}`, updatedHero)),
    )
  }

  deleteHero$(idHero: number): Observable<Hero[]> {
    return this.http.delete<any>(environment.apiUrl + `/heroes/${idHero}`)
  }

}


