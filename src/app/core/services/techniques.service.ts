import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.post<Technique>(environment.apiUrl + "/techniques/", formValue)
  }

  updateTechnique$(formValue: { id: number, name: string, heroId: number }): Observable<Technique> {
    return this.http.patch<Technique>(environment.apiUrl + `/techniques/${formValue.id}`, formValue)
  }

  deleteTechnique$(id: number): Observable<Technique[]> {
    return this.http.delete<any>(environment.apiUrl + `/techniques/${id}`)
  }
}
