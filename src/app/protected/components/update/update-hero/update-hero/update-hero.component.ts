import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from 'src/app/core/models/hero.interface';
import { updateHero } from 'src/app/store/actions/hero.actions';
import { selectHeroById } from 'src/app/store/selectors/hero.selectors';

@Component({
  selector: 'app-update-hero',
  templateUrl: './update-hero.component.html',
  styleUrls: ['./update-hero.component.scss']
})
export class UpdateHeroComponent implements OnInit {
  heroId!: number;
  updatedHeroForm!: FormGroup;
  updatedForm$!: Observable<FormGroup>;
  urlVerify!: RegExp;

  constructor(
    private formBuiler: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.heroId = +this.route.snapshot.params['id'];


    this.updatedForm$ = this.store.select(selectHeroById(this.heroId)).pipe(
      map(hero => this.updatedHeroForm = this.formBuiler.group({
        name: [hero?.name, Validators.required],
        description: [hero?.description, Validators.required],
        myImg: [hero?.myImg, [Validators.required, Validators.pattern(this.urlVerify)]]
      }, {
        updateOn: 'blur'
      }))
    )
    this.urlVerify = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
  }

  /* Dans ngOnInit méthode pour récupérer les données de hero, patate!!!!!!!!!!
   this.hero$.subscribe(hero => this.heroValues = hero);


   this.updatedHeroForm = this.formBuiler.group({
     name: [null, Validators.required],
     description: [null, Validators.required],
     myImg: [null, [Validators.required, Validators.pattern(this.urlVerify)]]
   }, {
     updateOn: 'blur'
   });*/
  onSubmitUpdatedForm() {

    let updatedHero: Hero = {
      name: this.updatedHeroForm.value.name,
      description: this.updatedHeroForm.value.description,
      myImg: this.updatedHeroForm.value.myImg,
      id: this.heroId
    };
    this.store.dispatch(updateHero({ updatedHero }));
    this.router.navigateByUrl(`protected/heroes/${this.heroId}`);
  }
}
