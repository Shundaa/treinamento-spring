import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Treinador } from './treinador';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class TreinadorService {

  //private treinadoresUrl = 'api/treinadores';  // URL to web api
  private treinadoresUrl = 'http://localhost:8080/treinador';  // URL to web api
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET treinadores from the server */
  getTreinadores (): Observable<Treinador[]> {
    return this.http.get<Treinador[]>(this.treinadoresUrl)
      .pipe(
        tap(treinadores => this.log('fetched treinadores')),
        catchError(this.handleError('getTreinadores', []))
      );
  }

  /** GET treinador by id. Return `undefined` when id not found */
  getTreinadorNo404<Data>(id: number): Observable<Treinador> {
    const url = `${this.treinadoresUrl}/?id=${id}`;
    return this.http.get<Treinador[]>(url)
      .pipe(
        map(treinadores => treinadores[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} treinador id=${id}`);
        }),
        catchError(this.handleError<Treinador>(`getTreinador id=${id}`))
      );
  }

  /** GET treinador by id. Will 404 if id not found */
  getTreinador(id: number): Observable<Treinador> {
    const url = `${this.treinadoresUrl}/${id}`;
    return this.http.get<Treinador>(url).pipe(
      tap(_ => this.log(`fetched treinador id=${id}`)),
      catchError(this.handleError<Treinador>(`getTreinador id=${id}`))
    );
  }

  /* GET treinadores whose name contains search term */
  searchTreinadores(term: string): Observable<Treinador[]> {
    if (!term.trim()) {
      // if not search term, return empty treinador array.
      return of([]);
    }
    return this.http.get<Treinador[]>(`${this.treinadoresUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found treinadores matching "${term}"`)),
      catchError(this.handleError<Treinador[]>('searchTreinadores', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new treinador to the server */
  addTreinador (treinador: Treinador): Observable<Treinador> {
    return this.http.post<Treinador>(this.treinadoresUrl, treinador, httpOptions).pipe(
      tap((treinador: Treinador) => this.log(`added treinador w/ id=${treinador.id}`)),
      catchError(this.handleError<Treinador>('addTreinador'))
    );
  }

  /** DELETE: delete the treinador from the server */
  deleteTreinador (treinador: Treinador | number): Observable<Treinador> {
    const id = typeof treinador === 'number' ? treinador : treinador.id;
    const url = `${this.treinadoresUrl}/${id}`;

    return this.http.delete<Treinador>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted treinador id=${id}`)),
      catchError(this.handleError<Treinador>('deleteTreinador'))
    );
  }

  /** PUT: update the treinador on the server */
  updateTreinador (treinador: Treinador): Observable<any> {
    return this.http.put(this.treinadoresUrl, treinador, httpOptions).pipe(
      tap(_ => this.log(`updated treinador id=${treinador.id}`)),
      catchError(this.handleError<any>('updateTreinador'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TreinadorService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TreinadorService: ${message}`);
  }
}
