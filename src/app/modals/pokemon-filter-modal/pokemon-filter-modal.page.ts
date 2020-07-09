import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { PokemonTypeModel } from 'src/app/models/pokemon-type.model';

@Component({
  selector: 'app-pokemon-filter-modal',
  templateUrl: './pokemon-filter-modal.page.html',
  styleUrls: ['./pokemon-filter-modal.page.scss'],
})
export class PokemonFilterModalPage implements OnInit {

  @Input() types: Array<PokemonTypeModel> = []
  @Input() currentTypeId?: string

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  typeWasSelected(id: string) {
    this.currentTypeId = this.currentTypeId == id ? null : id
    this.dismiss()
  }

  dismiss() {
    this.modalController.dismiss({
      "currentTypeId": this.currentTypeId
    });
  }

}
