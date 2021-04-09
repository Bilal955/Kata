import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { Movie } from '../models/movie.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('MovieService', () => {
  let movieService: MovieService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    })
      .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    movieService = new MovieService(httpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should parse file correctly', () => {
    const fileContent = 'tconst,titleType,primaryTitle,originalTitle,isAdult,startYear,endYear,runtimeMinutes,genres\n' +
      'tt0000001,short,Carmencita,Carmencita,0,1894,\\N,1,"Documentary,Short"\n' +
      'tt0000002,short,Le clown et ses chiens,Le clown et ses chiens,0,1892,\\N,5,"Animation,Short"\n' +
      'tt0000003,short,Pauvre Pierrot,Pauvre Pierrot,0,1892,\\N,4,"Animation,Comedy,Romance"\n';

    const movie1 = new Movie('tt0000001', 'short', 'Carmencita', 'Carmencita',
      false, 1894, '-', 1, 'Documentary,Short');
    const movie2 = new Movie('tt0000002', 'short', 'Le clown et ses chiens', 'Le clown et ses chiens',
      false, 1892, '-', 5, 'Animation,Short');
    const movie3 = new Movie('tt0000003', 'short', 'Pauvre Pierrot', 'Pauvre Pierrot',
      false, 1892, '-', 4, 'Animation,Comedy,Romance');
    const movieTab: Movie[] = [];
    movieTab.push(movie1, movie2, movie3);

    const parseResult = MovieService.parseFileContent(fileContent, '-');
    expect(parseResult.length).toEqual(movieTab.length);
    expect(parseResult).toEqual(movieTab);
  });
});
