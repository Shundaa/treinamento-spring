import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Treinador } from './treinador';
import { Injectable } from '@angular/core';
import { pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const pokemons = [];
    const treinadores = [
      { id: 11, name: 'Sparky',pokemons},
      { id: 12, name: 'Narco',pokemons },
      { id: 13, name: 'Bombasto',pokemons },
      { id: 14, name: 'Celeritas',pokemons },
      { id: 15, name: 'Magneta',pokemons },
      { id: 16, name: 'RubberMan',pokemons },
      { id: 17, name: 'Dynama' ,pokemons},
      { id: 18, name: 'Dr IQ' ,pokemons},
      { id: 19, name: 'Magma' ,pokemons},
      { id: 20, name: 'Tornado' ,pokemons}
    ];
    return {treinadores};
  }

  // Overrides the genId method to ensure that a treinador always has an id.
  // If the treinadores array is empty,
  // the method below returns the initial number (11).
  // if the treinadores array is not empty, the method below returns the highest
  // treinador id + 1.
  genId(treinadores: Treinador[]): number {
    return treinadores.length > 0 ? Math.max(...treinadores.map(treinador => treinador.id)) + 1 : 11;
  }
}
