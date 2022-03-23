import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HeroDto } from 'src/app/core/models/heroDto.interface';
import { HeroesDtoService } from 'src/app/core/services/heroes-dto.service';
@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, OnDestroy {

  heroesDto$!: Observable<HeroDto[]>;
  // heroesDto!: HeroDto[];

  // subHeroesDto!: Subscription;

  constructor(
    private heroesDtoService: HeroesDtoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['searchTerm'])
        //params.searchTerm params['searchTerm']
        this.heroesDto$ = this.heroesDtoService.getHeroesDtoBySearchTerm$(
          params['searchTerm']
        );
      else this.heroesDto$ = this.heroesDtoService.getHeroesDto$();
    });


    // this.heroesDto$ = this.heroesDtoService.getHeroesDto$();
    // this.subHeroesDto = this.heroesDto$.subscribe(heroesDto => this.heroesDto = heroesDto);
  }

  ngOnDestroy(): void {
    // this.subHeroesDto.unsubscribe();
  }
}


