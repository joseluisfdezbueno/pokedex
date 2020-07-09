import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PokemonFilterModalPageRoutingModule } from './pokemon-filter-modal-routing.module';
import { PokemonFilterModalPage } from './pokemon-filter-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    PokemonFilterModalPageRoutingModule
  ],
  declarations: [PokemonFilterModalPage]
})
export class PokemonFilterModalPageModule {}
