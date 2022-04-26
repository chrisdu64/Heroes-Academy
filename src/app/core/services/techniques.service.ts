import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Technique } from '../models/technique.interface';

@Injectable({
  providedIn: 'root'
})
export class TechniquesService {
  techniques$!: Observable<Technique[]>;

  constructor(private http: HttpClient) { }

  getTechniques$(): Observable<Technique[]> {
    return this.http.get<Technique[]>(environment.apiUrl + '/techniques');
  }

  addTechnique$(formValue: { name: string, heroId: number }): Observable<Technique> {
    return this.getTechniques$().pipe(
      map(techniques => [...techniques].sort((a: Technique, b: Technique) => a.id - b.id)),
      map(sortedTechniques => sortedTechniques[sortedTechniques.length - 1]),
      map(previousTechnique => ({
        ...formValue,
        id: previousTechnique.id + 1
      })),
      switchMap(newTechnique => this.http.post<Technique>(environment.apiUrl + "/techniques/", newTechnique))
    )
  }

  deleteTechnique$(id: number): Observable<Technique[]> {
    return this.http.delete<any>(environment.apiUrl + `/techniques/${id}`)
  }

}
