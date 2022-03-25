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
  // techniques: Technique[] = [
  //   { id: 1, heroId: 1, name: 'Multi clonage' },
  //   { id: 2, heroId: 1, name: `L'orbe tourbillonant` },
  //   { id: 3, heroId: 1, name: `Les techniques d'ermite` },
  //   { id: 4, heroId: 2, name: 'Katon' },
  //   { id: 5, heroId: 2, name: 'Raiton' },
  //   { id: 6, heroId: 2, name: 'Sharingan' },
  //   { id: 7, heroId: 2, name: 'Rinnegan' },
  //   { id: 8, heroId: 3, name: 'Technique de la Paume Surnaturelle ou Mystique' },
  //   { id: 9, heroId: 3, name: 'Explosion de la fleur de cerisier' },
  //   { id: 10, heroId: 3, name: 'Rupture du sceau' },
  //   { id: 11, heroId: 3, name: 'La puissance des Cent' }
  // ]

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
}

  // getTechniquesByHeroId(heroId: number): Observable<Technique[]> {

  //   return this.http.get<Technique[]>(environment.apiUrl + "/techniques?heroId=" + heroId)
  // }

  // getTechniques(): Technique[] {
  //   return this.techniques;
  // }
