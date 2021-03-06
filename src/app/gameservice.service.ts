import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';



const endpoint = 'http://localhost:5000/api/v1.0/';
const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type':  'application/json'
	})
};

@Injectable({
  providedIn: 'root'
})
export class GameserviceService {

	constructor(private http: HttpClient) { }
	
	 
	private extractData(res: Response) {
	  let body = res;
	  return body || { };
	}
	getYears(): Observable<any> {
		return this.http.get(endpoint + 'years/').pipe(
		map(this.extractData)); 
	}
	getGamesReleases(year): Observable<any> {
		return this.http.get(endpoint + 'gamesreleases/?year=' + year ).pipe(
		map(this.extractData)); 
	}
	getGamesAge(age): Observable<any> {
		return this.http.get(endpoint + 'getgamesage/?age=' + age ).pipe(
		map(this.extractData)); 
	}
	getGamesGenre(genre): Observable<any> {
		return this.http.get(endpoint + 'generegame/?genre=' + genre ).pipe(
		map(this.extractData)); 
	}
	
	getAge(): Observable<any> {
		return this.http.get(endpoint + 'age/').pipe(
		map(this.extractData)); 
	}
	
	getSales(): Observable<any> {
	  return this.http.get(endpoint + 'sales/10/').pipe(
		map(this.extractData)); 
		//return this.http.get(endpoint + 'sales');
	}
	
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

		// TODO: send the error to remote logging infrastructure
		console.error(error); // log to console instead

		// TODO: better job of transforming error for user consumption
		console.log(`${operation} failed: ${error.message}`);

		// Let the app keep running by returning an empty result.
		return of(result as T);
	  };
	}
}