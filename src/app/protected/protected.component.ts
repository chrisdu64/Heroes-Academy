import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAbilities } from '../store/actions/ability.actions';
import { getHeroes } from '../store/actions/hero.actions';
import { getTechniques } from '../store/actions/technique.actions';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html'
})
export class ProtectedComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getHeroes());
    this.store.dispatch(getAbilities());
    this.store.dispatch(getTechniques());
  }

}
