import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateHeroDtoComponent } from "./update-hero-dto/update-hero-dto.component";

const routes: Routes = [
    { path: ':id', component: UpdateHeroDtoComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UpdateRoutingModule { }