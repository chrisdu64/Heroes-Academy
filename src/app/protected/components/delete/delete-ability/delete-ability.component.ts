import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ability } from 'src/app/core/models/ability.interface';
import { AbilitiesService } from 'src/app/core/services/abilities.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-ability',
  templateUrl: './delete-ability.component.html',
  styleUrls: ['./delete-ability.component.scss']
})
export class DeleteAbilityComponent implements OnInit {

  heroId!: number;
  abilities$!: Observable<Ability[]>;

  constructor(
    private route: ActivatedRoute,
    private abilitiesService: AbilitiesService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.heroId = +this.route.snapshot.params['id'];

    this.abilities$ = this.abilitiesService.getAbilities$().pipe(
      map(abilities => abilities.filter(
        ability => ability.heroId === this.heroId
      ))
    );
  }

  onDeleteAbility(id: number): void {
    this.http.delete(environment.apiUrl + `/abilities/${id}`).subscribe(() => this.router.navigateByUrl(`/heroes/${this.heroId}`))

  }

}
