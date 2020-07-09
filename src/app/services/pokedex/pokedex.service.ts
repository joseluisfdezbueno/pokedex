import { NetInterface } from './../../interfaces/net';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { PokemonModel } from 'src/app/models/pokemon.model';
import { PokemonDetailModel } from 'src/app/models/pokemon-detail.model';
import { PokemonTypeModel } from 'src/app/models/pokemon-type.model';
import { PokedexInterface } from 'src/app/interfaces/pokedex';

@Injectable({
  providedIn: 'root'
})
export class PokedexService implements PokedexInterface {

  private pokemonTypesEndpoint: string = "/type/"
  private pokemonDetailEndpoint: string = "/pokemon/"
  private pokemonListEndpoint: (offset: number, limit: number) => string = (offset, limit) => `/pokemon?offset=${offset}&limit=${limit}`

  constructor(private netService: NetInterface) { }

  getPokemonList(offset: number, limit: number): Observable<Array<PokemonModel>> {
    return this.netService.getRequest(this.pokemonListEndpoint(offset, limit)).pipe(map(response => {       
      const pokemonList: Array<PokemonModel> = response.results.map((pokemon: {name: string, url: string}) => { 
        const pokemonId = this.getIdFromApiResponse(pokemon)
        return new PokemonModel(pokemonId, pokemon.name) 
      })
      return pokemonList
    }))
  }

  getPokemonListByType(typeId: string): Observable<Array<PokemonModel>> {
    return this.netService.getRequest(this.pokemonTypesEndpoint + typeId).pipe(map(response => {       
      const pokemonList: Array<PokemonModel> = response.pokemon.map((pokemon: {pokemon: {name: string, url: string}}) => { 
        const pokemonId = this.getIdFromApiResponse(pokemon.pokemon)
        return new PokemonModel(pokemonId, pokemon.pokemon.name) 
      })
      return pokemonList
    }))
  }

  getPokemonById(id: string): Observable<PokemonDetailModel> {
    return this.netService.getRequest(this.pokemonDetailEndpoint + id).pipe(map(response => {
      return new PokemonDetailModel(response.id, response.name, response.species.name, response.height, 
        response.weight, response.sprites.back_default, response.sprites.front_default)
    }))
  }

  getPokemonTypes(): Observable<Array<PokemonTypeModel>> {
    return this.netService.getRequest(this.pokemonTypesEndpoint).pipe(map(response => {
      const pokemonTypeList: Array<PokemonTypeModel> = response.results.map((pokemonType: {name: string, url: string}) => { 
        const typeId = this.getIdFromApiResponse(pokemonType)
        return new PokemonTypeModel(typeId, pokemonType.name) 
      })
      return pokemonTypeList
    }))
  }

  private getIdFromApiResponse(response: {name: string, url: string}): string {
    return response.url.split("/").slice(-2, -1).join()
  }

}
