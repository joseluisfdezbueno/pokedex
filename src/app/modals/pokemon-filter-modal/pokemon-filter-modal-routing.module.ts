import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonFilterModalPage } from './pokemon-filter-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonFilterModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonFilterModalPageRoutingModule {}
