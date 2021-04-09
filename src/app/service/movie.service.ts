import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  // Utility method to parse csv dataset file and build an array of movies
  static parseFileContent(data: string, noDataChar: string): Movie[] {
    const csvToRowArray = data.split('\n').filter(csvRow => csvRow.length > 0);  // Filters empty line breaks
    const movieArray: Movie[] = [];
    for (let index = 1; index < csvToRowArray.length; index++) {
      const row = csvToRowArray[index].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      movieArray.push(new Movie( row[0], row[1], row[2], row[3], Boolean(parseInt(row[4], 10)), parseInt(row[5], 10),
        parseInt(row[6], 10) ? parseInt(row[6], 10)  : noDataChar,
        parseInt(row[7], 10) ? parseInt(row[7], 10)  : noDataChar,
        row[8] !== '\\N' ? row[8].split('"').join('') : noDataChar));
    }
    return movieArray;
  }

  public getFileContent(fileName: string): Observable<string> {
    return this.http.get(fileName, {responseType: 'text'});
  }
}
