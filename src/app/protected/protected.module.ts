import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { AbilityEffects } from '../store/effects/ability.effects';
import { HeroEffects } from '../store/effects/hero.effects';
import { TechniqueEffects } from '../store/effects/technique.effects';
import { ProtectedRoutingModule } from './protected-routing.module';
import { ProtectedComponent } from './protected.component';
import { UpdateHeroComponent } from './components/update/update-hero/update-hero/update-hero.component';

@NgModule({
  declarations: [
    ProtectedComponent
  ],
  imports: [
    ProtectedRoutingModule,
    SharedModule,
    EffectsModule.forFeature([HeroEffects, AbilityEffects, TechniqueEffects])
  ]
})
export class ProtectedModule { }
