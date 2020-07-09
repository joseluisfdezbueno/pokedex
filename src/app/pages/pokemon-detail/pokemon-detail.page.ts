import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { PokemonDetailModel } from 'src/app/models/pokemon-detail.model';
import { PokedexInterface } from 'src/app/interfaces/pokedex';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit, OnDestroy {

  private pokemonDetail: PokemonDetailModel
  private pokemonSubscription: Subscription
  private isLoading: boolean

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private pokedexService: PokedexInterface
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPokemonData(params.id)
    })
  }

  ngOnDestroy() {
    this.pokemonSubscription.unsubscribe()
  }

  private async getPokemonData(pokemonId: string) {
    this.isLoading = true
    let loading = await this.loadingController.create()
    await loading.present()

    this.pokemonSubscription = this.pokedexService.getPokemonById(pokemonId).subscribe(pokemonData => {
      this.pokemonDetail = pokemonData
      loading.dismiss()
    }, () => {
      loading.dismiss()
      this.showErrorAlert()
    }, () => {
      this.isLoading = false
    })
  }

  private async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'En estos momentos el servicio no está disponible. Por favor, inténtalo más tarde.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

}
