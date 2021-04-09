import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieComponent } from './movie.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { GlobalVars } from '../shared/globals';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MovieService } from '../service/movie.service';
import { of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSortHarness } from '@angular/material/sort/testing';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';

describe('MovieComponent', () => {
  let httpClient: HttpClient;
  let fixture: ComponentFixture<MovieComponent>;
  let component: MovieComponent;
  let movie1: Movie;
  let movie2: Movie;
  let movie3: Movie;
  let movie4: Movie;
  let movie5: Movie;
  let movie6: Movie;
  let movie7: Movie;
  const movieTab: Movie[] = [];
  let loader: HarnessLoader;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatInputModule,
        MatSortModule,
        MatDialogModule,
        MatSelectModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        BrowserModule,
        BrowserAnimationsModule,
        PaginationModule.forRoot()
      ],
      providers: [
        GlobalVars,
        { provide: MovieService, useValue: {
            getFileContent: () => of('tconst,titleType,primaryTitle,originalTitle,isAdult,startYear,endYear,runtimeMinutes,genres\n' +
              'tt0000001,short,Carmencita,Carmencita,0,1895,\\N,1,"Documentary,Short"\n' +
              'tt0000002,short,Le clown et ses chiens,Le clown et ses chiens,0,1896,\\N,5,"Animation,Short"\n' +
              'tt0000003,short,Pauvre Pierrot,Pauvre Pierrot,0,1897,\\N,4,"Animation,Comedy,Romance"\n' +
              'tt0000004,short,Un bon bock,Un bon bock,0,1894,\\N,12,"Animation,Short"\n' +
              'tt0000005,short,Blacksmith Scene,Blacksmith Scene,0,1893,\\N,1,"Comedy,Short"\n' +
              'tt0000006,short,Chinese Opium Den,Chinese Opium Den,0,1892,\\N,1,Short\n' +
              'tt0000009,short,Miss Jerry,Miss Jerry,0,1891,\\N,40,"Romance,Short"\n'),
            parseFileContent: (data, noDataChar) => MovieService.parseFileContent(data, noDataChar)
          }
        },
        { provide: MatDialog, useValue: {} }],
      declarations: [
        MovieComponent
      ],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    component.ngOnInit();

    movie1 = new Movie('tt0000001', 'short', 'Carmencita', 'Carmencita',
      false, 1895, '-', 1, 'Documentary,Short');
    movie2 = new Movie('tt0000002', 'short', 'Le clown et ses chiens', 'Le clown et ses chiens',
      false, 1896, '-', 5, 'Animation,Short');
    movie3 = new Movie('tt0000003', 'short', 'Pauvre Pierrot', 'Pauvre Pierrot',
      false, 1897, '-', 4, 'Animation,Comedy,Romance');
    movie4 = new Movie('tt0000004', 'short', 'Un bon bock', 'Un bon bock',
      false, 1894, '-', 12, 'Animation,Short');
    movie5 = new Movie('tt0000005', 'short', 'Blacksmith Scene', 'Blacksmith Scene',
      false, 1893, '-', 1, 'Comedy,Short');
    movie6 = new Movie('tt0000006', 'short', 'Chinese Opium Den', 'Chinese Opium Den',
      false, 1892, '-', 1, 'Short');
    movie7 = new Movie('tt0000009', 'short', 'Miss Jerry', 'Miss Jerry',
      false, 1891, '-', 40, 'Romance,Short');
    movieTab.push(movie1, movie2, movie3, movie4, movie5, movie6, movie7);
  }));

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should filter movies', async () => {
    const input = await loader.getAllHarnesses(MatInputHarness);
    const filterInput = input.shift();
    await filterInput.setValue('Pauvre');

    expect(component.dataSource.filteredData.length).toEqual(1);
    expect(component.dataSource.filteredData.shift()).toEqual(movie3);
  });

  it('should load harness for mat-sort and have 9 column that can be sorted', async () => {
    const sorts = await loader.getHarness(MatSortHarness);
    const sortHeaders = await sorts.getSortHeaders();
    expect(sortHeaders.length).toBe(9);
  });

  it('should sort movies on start year', async () => {
    const pagination = await loader.getHarness(MatPaginatorHarness);
    // In order to have all the 7 movies on the same page
    await pagination.setPageSize(10);

    const sort = await loader.getHarness(MatSortHarness);
    const startYearHeader = (await sort.getSortHeaders())[5];  // Sort on startYear asc
    expect(await startYearHeader.isDisabled()).toBe(false);

    await startYearHeader.click();
    component.dataSource.connect().subscribe(sortedData => {
      expect(sortedData).toEqual([movie7, movie6, movie5, movie4, movie1, movie2, movie3]);  // Sorted like (1891, 1892, 1894 ..., 1897)
    });
  });

  it('should display first page with 5 movies for dataset of 7 movies', async () => {
    const pagination = await loader.getHarness(MatPaginatorHarness);
    await pagination.setPageSize(5);
    component.dataSource.connect().subscribe(displayedData => {
      expect(displayedData.length).toEqual(5);
      expect(displayedData).toEqual([movie1, movie2, movie3, movie4, movie5]);
    });
  });

  it('should display second page with two movies for dataset of 7 movies', async () => {
    const pagination = await loader.getHarness(MatPaginatorHarness);
    await pagination.setPageSize(5);
    await pagination.goToNextPage();
    component.dataSource.connect().subscribe(displayedData => {
      expect(displayedData.length).toEqual(2);
      expect(displayedData).toEqual([movie6, movie7]);
    });
  });
});
