import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PokemonDetailPageRoutingModule } from './pokemon-detail-routing.module';
import { PokemonDetailPage } from './pokemon-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PokemonDetailPageRoutingModule
  ],
  declarations: [PokemonDetailPage]
})
export class PokemonDetailPageModule {}
