import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PokemonListPageRoutingModule } from './pokemon-list-routing.module';
import { PokemonListPage } from './pokemon-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PokemonListPageRoutingModule
  ],
  declarations: [PokemonListPage]
})
export class PokemonListPageModule {}
