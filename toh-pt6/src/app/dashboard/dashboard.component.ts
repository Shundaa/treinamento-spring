import { Component, OnInit } from '@angular/core';
import { Treinador } from '../treinador';
import { TreinadorService } from '../treinador.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  treinadores: Treinador[] = [];

  constructor(private treinadorService: TreinadorService) { }

  ngOnInit() {
    this.getTreinadores();
  }

  getTreinadores(): void {
    this.treinadorService.getTreinadores()
      .subscribe(treinadores => this.treinadores = treinadores.slice(1, 5));
  }
}
