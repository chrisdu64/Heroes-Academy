import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HeroDto } from '../models/heroDto.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesDtoService {
  heroesDto: HeroDto[] | null = null;

  constructor() { }
  setHeroesDto(heroesDto: HeroDto[]): void {
    this.heroesDto = heroesDto;
  }

  getHeroesDto(): HeroDto[] | null {
    return this.heroesDto
  }
}
