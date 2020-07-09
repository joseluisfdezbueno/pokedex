import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IonInfiniteScroll, ModalController, IonContent, LoadingController, AlertController } from '@ionic/angular';
import { PokemonFilterModalPage } from 'src/app/modals/pokemon-filter-modal/pokemon-filter-modal.page';
import { PokemonModel } from 'src/app/models/pokemon.model';
import { PokemonTypeModel } from 'src/app/models/pokemon-type.model';
import { PokedexInterface } from 'src/app/interfaces/pokedex';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss']
})
export class PokemonListPage implements OnInit, OnDestroy {

  @ViewChild(IonContent) ionContent: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private loading: HTMLIonLoadingElement

  private selectedLanguage: string = this.translateService.currentLang
  private currentTypeId?: string
  private offset: number = 0
  private limit: number = 40
  private pokemonList: Array<PokemonModel> = []
  private pokemonListSubscription: Subscription
  private pokemonListByTypesSubscription: Subscription

  constructor(
    private translateService: TranslateService,
    private pokedexService: PokedexInterface,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.loadPokemonList()
  }

  ngOnDestroy() {
    this.pokemonListSubscription.unsubscribe()
    this.pokemonListByTypesSubscription.unsubscribe()
  }

  loadPokemonsAnyType() {
    this.pokemonListSubscription = this.pokedexService.getPokemonList(this.offset, this.limit).subscribe(pokemonList => {
      if (pokemonList.length < this.limit) {
        this.infiniteScroll.disabled = true
      }
      this.offset += this.limit
      this.pokemonList = this.pokemonList.concat(pokemonList)
      this.hideLoading()
    }, () => {
      this.hideLoading()
      this.showErrorAlert()
    }, () => {
      this.infiniteScroll.complete()
    })
  }

  loadPokemonByType() {
    this.pokemonListByTypesSubscription = this.pokedexService.getPokemonListByType(this.currentTypeId).subscribe(pokemonList => {
      this.pokemonList = pokemonList
      this.hideLoading()
    }, () => {
      this.hideLoading()
      this.showErrorAlert()
    })
  }

  filterButtonWasPressed() {
    this.showLoading()
    this.pokedexService.getPokemonTypes().subscribe(pokemonTypes => {
      this.hideLoading()
      this.openFilterModal(pokemonTypes)
    }, () => {
      this.hideLoading()
      this.showErrorAlert()
    })
  }

  languageWasSelected() {
    this.translateService.use(this.selectedLanguage)
  }

  private async loadPokemonList() {
    this.ionContent.scrollToTop(100)
    this.pokemonList = []
    await this.showLoading()
  
    if (this.currentTypeId != null) {
      this.infiniteScroll.disabled = true
      this.loadPokemonByType()
    } else {
      this.infiniteScroll.disabled = false
      this.offset = 0
      this.loadPokemonsAnyType()
    }
  }

  private async openFilterModal(pokemonTypes: Array<PokemonTypeModel>) {
    let filterModal = await this.modalController.create({
      component: PokemonFilterModalPage,
      componentProps: { currentTypeId: this.currentTypeId, types: pokemonTypes }
    })
    filterModal.present()
    const currentTypeId = (await filterModal.onWillDismiss()).data.currentTypeId
    this.filterModalWasClosed(currentTypeId)
  }

  private filterModalWasClosed(currentTypeId?: string) {
    if (this.currentTypeId != currentTypeId) {
      this.currentTypeId = currentTypeId
      this.loadPokemonList()
    }
  }

  private async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'En estos momentos el servicio no está disponible. Por favor, inténtalo más tarde.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  private async showLoading() {
    this.loading = await this.loadingController.create()
    return await this.loading.present()
  }

  private hideLoading() {
    if (this.loading != null) {
      this.loading.dismiss()
      this.loading = null
    }
  }

}