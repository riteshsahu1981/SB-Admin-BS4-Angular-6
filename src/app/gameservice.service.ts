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
	
	getSales(): Observable<any> {
	  return this.http.get(endpoint + 'sales/').pipe(
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