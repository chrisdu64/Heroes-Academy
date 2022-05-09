import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateAbilityComponent } from "./update-ability/update-ability.component";
import { UpdateHeroComponent } from "./update-hero/update-hero/update-hero.component";

const routes: Routes = [
    { path: ':id', component: UpdateHeroComponent },
    { path: 'ability/:id', component: UpdateAbilityComponent },
    // { path: 'technique/:id', component: NewTechniqueComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UpdateRoutingModule { }