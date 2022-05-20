import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ability } from 'src/app/core/models/ability.interface';
import { Hero } from 'src/app/core/models/hero.interface';
import { Technique } from 'src/app/core/models/technique.interface';
import { updateAbility } from 'src/app/store/actions/ability.actions';
import { updateHero } from 'src/app/store/actions/hero.actions';
import { updateTechnique } from 'src/app/store/actions/technique.actions';
import { selectHeroDtoById } from 'src/app/store/selectors/hero-dto.selectors';

@Component({
  selector: 'app-update-hero-dto',
  templateUrl: './update-hero-dto.component.html',
  styleUrls: ['./update-hero-dto.component.scss']
})
export class UpdateHeroDtoComponent implements OnInit {
  heroId!: number;
  updatedForm$!: Observable<FormGroup>;
  urlVerify!: RegExp;
  heroDtoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.heroId = +this.route.snapshot.params['id'];
    this.urlVerify = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.updatedForm$ = this.store.select(selectHeroDtoById(this.heroId)).pipe(
      map(heroDto => this.heroDtoForm = this.fb.group({
        id: [heroDto?.id, Validators.required],
        name: [heroDto?.name, Validators.required],
        description: [heroDto?.description, Validators.required],
        myImg: [heroDto?.myImg, [Validators.required, Validators.pattern(this.urlVerify)]],
        abilities: this.fb.array(
          heroDto?.abilities.map(ability =>
            this.fb.group({
              id: [ability.id, Validators.required],
              name: [ability.name, Validators.required],
              heroId: [ability.heroId, Validators.required]
            }))
          ?? []
        ),
        techniques: this.fb.array(
          heroDto?.techniques.map(technique =>
            this.fb.group({
              id: [technique.id, Validators.required],
              name: [technique.name, Validators.required],
              heroId: [technique.heroId, Validators.required]
            }))
          ?? []
        )
      })
      )
    )
  }

  get abilities() {
    return this.heroDtoForm.controls["abilities"] as FormArray;
  }
  get techniques() {
    return this.heroDtoForm.controls["techniques"] as FormArray;
  }

  onSubmitUpdatedForm() {
    let updatedHero: Hero = {
      name: this.heroDtoForm.value.name,
      description: this.heroDtoForm.value.description,
      myImg: this.heroDtoForm.value.myImg,
      id: this.heroId
    };

    this.abilities.value.forEach((ability: Ability) => {
      let updatedAbility: Ability = {
        name: ability.name,
        id: ability.id,
        heroId: this.heroId
      };
      this.store.dispatch(updateAbility({ updatedAbility }))
    }
    );

    this.techniques.value.forEach((technique: Technique) => {
      let updatedTechnique: Technique = {
        name: technique.name,
        id: technique.id,
        heroId: this.heroId
      };
      this.store.dispatch(updateTechnique({ updatedTechnique }))
    }
    );

    this.store.dispatch(updateHero({ updatedHero }));

    this.router.navigateByUrl(`protected/heroes/${this.heroId}`);
  }
}
