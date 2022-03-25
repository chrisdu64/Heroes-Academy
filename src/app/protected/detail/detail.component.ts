import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HeroDto } from 'src/app/core/models/heroDto.interface';
import { HeroesDtoService } from 'src/app/core/services/heroes-dto.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  // subHeroesDto!: Subscription;
  heroDto!: HeroDto | undefined;
  // heroesDto$!: Observable<HeroDto[]>;
  heroDto$!: Observable<HeroDto | undefined>;
  heroId!: number;

  constructor(
    private heroesDtoService: HeroesDtoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // const heroId = +this.route.snapshot.params['id'];
    // this.heroDto$ = this.heroesDtoService.getHeroesDtoById$(heroId);
    this.heroId = +this.route.snapshot.params['id'];

    this.heroDto$ = this.heroesDtoService.getHeroesDto$().pipe(
      map(heroesDto => heroesDto.find(
        heroDto => heroDto.id === this.heroId
      )
      ),
      delay(600)
    );
    // this.subHeroesDto = this.heroesDto$.subscribe(
    //   heroesDto => this.heroDto = heroesDto.find(
    //     heroDto => heroDto.id === this.heroId
    //   )
    // );
  }

  ngOnDestroy(): void {
    // this.subHeroesDto.unsubscribe();
  }

  onReturn(): void {
    this.router.navigateByUrl('heroes');
  }

  onCreateNewTechnique(id: number): void {
    this.router.navigateByUrl(`create/technique/${id}`);
  }

  onDeleteTechnique(id: number): void {
    this.router.navigateByUrl(`delete/technique/${id}`);
  }

}
