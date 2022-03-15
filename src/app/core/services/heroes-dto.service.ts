import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HeroDto } from '../models/heroDto.interface';
import { AbilitiesService } from './abilities.service';
import { HeroesService } from './heroes.service';
import { TechniquesService } from './techniques.service';

@Injectable({
  providedIn: 'root'
})
export class HeroesDtoService {

  heroes$ = this.heroesService.getHeroes();
  abilities$ = this.abilitiesService.getAbilities();
  techniques$ = this.techniquesService.getTechniques();

  heroesDto$!: Observable<HeroDto[]>;

  constructor(
    private heroesService: HeroesService,
    private abilitiesService: AbilitiesService,
    private techniquesService: TechniquesService
  ) { }

  setHeroesDto$(): void {
    this.heroesDto$ = forkJoin([this.heroes$, this.abilities$, this.techniques$]).pipe(
      map(([heroes, abilities, techniques]) =>
        heroes.map(hero => ({
          ...hero,
          abilities: abilities.filter(ability => ability.heroId === hero.id), techniques: techniques.filter(technique => technique.heroId === hero.id)
        }))
      )
    );
  }

  getHeroesDto$(): Observable<HeroDto[]> {
    if (this.heroesDto$ === undefined) {
      this.setHeroesDto$();
    };
    return this.heroesDto$;
  }
}