export class PokemonDetailModel {
    id: number
    name: string
    specie: string
    height: number
    weight: number
    backImage: string
    frontImage: string
  
    constructor(id: number, name: string, specie: string, height: number, 
      weight: number, backImage: string, frontImage: string) {
      this.id = id
      this.name = name
      this.specie = specie
      this.height = height
      this.weight = weight
      this.backImage = backImage
      this.frontImage = frontImage
    }
  }