import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeroDto } from 'src/app/core/models/heroDto.interface';
import { selectHeroDtoById } from 'src/app/store/selectors/hero-dto.selectors';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  heroDto!: HeroDto | undefined;
  heroDto$!: Observable<HeroDto | undefined>;
  heroId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.heroId = +this.route.snapshot.params['id'];

    this.heroDto$ = this.store.select(selectHeroDtoById(this.heroId));
  }

  onReturn(): void {
    this.router.navigateByUrl('protected/heroes');
  }

  onCreateNewTechnique(id: number): void {
    this.router.navigateByUrl(`protected/create/technique/${id}`);
  }

  onDeleteTechnique(id: number): void {
    this.router.navigateByUrl(`protected/delete/technique/${id}`);
  }

}
