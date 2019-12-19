import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Treinador }         from '../treinador';
import { TreinadorService }  from '../treinador.service';

@Component({
  selector: 'app-treinador-detail',
  templateUrl: './treinador-detail.component.html',
  styleUrls: [ './treinador-detail.component.css' ]
})
export class TreinadorDetailComponent implements OnInit {
  @Input() treinador: Treinador;

  constructor(
    private route: ActivatedRoute,
    private treinadorService: TreinadorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTreinador();
  }

  getTreinador(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.treinadorService.getTreinador(id)
      .subscribe(treinador => this.treinador = treinador);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.treinadorService.updateTreinador(this.treinador)
      .subscribe(() => this.goBack());
  }
}
