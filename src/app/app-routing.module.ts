import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pokemon-list',
    loadChildren: './pages/pokemon-list/pokemon-list.module#PokemonListPageModule'
  },
  {
    path: 'pokemon-detail/:id',
    loadChildren: './pages/pokemon-detail/pokemon-detail.module#PokemonDetailPageModule'
  },
  {
    path: 'pokemon-filter-modal',
    loadChildren: './modals/pokemon-filter-modal/pokemon-filter-modal.module#PokemonFilterModalPageModule'
  },
  {
    path: '',
    redirectTo: 'pokemon-list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
