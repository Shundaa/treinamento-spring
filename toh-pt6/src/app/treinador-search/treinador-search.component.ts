import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Treinador } from '../treinador';
import { TreinadorService } from '../treinador.service';

@Component({
  selector: 'app-treinador-search',
  templateUrl: './treinador-search.component.html',
  styleUrls: [ './treinador-search.component.css' ]
})
export class TreinadorSearchComponent implements OnInit {
  treinadores$: Observable<Treinador[]>;
  private searchTerms = new Subject<string>();

  constructor(private treinadorService: TreinadorService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.treinadores$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.treinadorService.searchTreinadores(term)),
    );
  }
}
