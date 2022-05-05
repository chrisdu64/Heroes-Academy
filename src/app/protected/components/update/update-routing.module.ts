import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateHeroComponent } from "./update-hero/update-hero/update-hero.component";

const routes: Routes = [
    { path: ':id', component: UpdateHeroComponent },
    // { path: 'ability/:id', component: NewAbilityComponent },
    // { path: 'technique/:id', component: NewTechniqueComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UpdateRoutingModule { }