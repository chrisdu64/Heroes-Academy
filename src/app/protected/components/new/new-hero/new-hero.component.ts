import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from 'src/app/core/models/hero.interface';
import { addHero } from 'src/app/store/actions/hero.actions';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.scss']
})
export class NewHeroComponent implements OnInit {

  heroForm!: FormGroup;
  newHero$!: Observable<Hero>;
  urlVerify!: RegExp;

  constructor(
    private formBuiler: FormBuilder,
    private router: Router,
    private store: Store) { }

  ngOnInit(): void {

    this.urlVerify = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.heroForm = this.formBuiler.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      myImg: [null, [Validators.required, Validators.pattern(this.urlVerify)]]
    }, {
      updateOn: 'blur'
    });
    this.newHero$ = this.heroForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        id: 0,
      }))
    )
  }

  onSubmitHeroForm() {
    let newHero: Hero = {
      name: this.heroForm.value.name,
      description: this.heroForm.value.description,
      myImg: this.heroForm.value.myImg,
      id: this.heroForm.value.id
    };
    this.store.dispatch(addHero({ newHero }));
    this.router.navigateByUrl('protected/heroes');
  }
}
