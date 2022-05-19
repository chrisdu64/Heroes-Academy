import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.post<Hero>(environment.apiUrl + "/heroes/", formValue)
  }

  updateHero$(formValue: { id: number, name: string, description: string, myImg: string }): Observable<Hero> {
    return this.http.patch<Hero>(environment.apiUrl + `/heroes/${formValue.id}`, formValue)
  }

  deleteHero$(idHero: number): Observable<Hero[]> {
    return this.http.delete<any>(environment.apiUrl + `/heroes/${idHero}`)
  }

}


