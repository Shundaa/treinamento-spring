import { Component, OnInit } from '@angular/core';

import { Treinador } from '../treinador';
import { TreinadorService } from '../treinador.service';

@Component({
  selector: 'app-treinador',
  templateUrl: './treinador.component.html',
  styleUrls: ['./treinador.component.css']
})
export class TreinadorComponent implements OnInit {
  treinadores: Treinador[];

  constructor(private treinadorService: TreinadorService) { }

  ngOnInit() {
    this.getTreinadores();
  }

  getTreinadores(): void {
    this.treinadorService.getTreinadores()
    .subscribe(treinadores => this.treinadores = treinadores);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.treinadorService.addTreinador({ name } as Treinador)
      .subscribe(treinador => {
        this.treinadores.push(treinador);
      });
  }

  delete(treinador: Treinador): void {
    this.treinadores = this.treinadores.filter(h => h !== treinador);
    this.treinadorService.deleteTreinador(treinador).subscribe();
  }

}
