import { Observable } from 'rxjs';
import { PokemonModel } from '../models/pokemon.model';
import { PokemonDetailModel } from '../models/pokemon-detail.model';
import { PokemonTypeModel } from '../models/pokemon-type.model';

export interface Pokedex {

    getPokemonList(offset: number, limit: number): Observable<Array<PokemonModel>>
  
    getPokemonListByType(typeId: string): Observable<Array<PokemonModel>>
  
    getPokemonById(id: string): Observable<PokemonDetailModel>
  
    getPokemonTypes(): Observable<Array<PokemonTypeModel>>

}

export abstract class PokedexInterface implements Pokedex {

    abstract getPokemonList(offset: number, limit: number): Observable<Array<PokemonModel>>
  
    abstract getPokemonListByType(typeId: string): Observable<Array<PokemonModel>>
  
    abstract getPokemonById(id: string): Observable<PokemonDetailModel>
  
    abstract getPokemonTypes(): Observable<Array<PokemonTypeModel>>

}
