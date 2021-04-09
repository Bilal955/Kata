import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Movie } from '../models/movie.model';
import { MovieService } from '../service/movie.service';
import { GlobalVars } from '../shared/globals';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['primaryTitle', 'titleType', 'tconst', 'originalTitle',
    'isAdult', 'startYear', 'endYear', 'runtimeMinutes', 'genres'];
  dataSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private matDialog: MatDialog, private movieService: MovieService, private globals: GlobalVars) {
  }

  ngOnInit() {
    // Retrieve dataset from file and convert it into an array of Movie to be displayed
    this.movieService.getFileContent(this.globals.PATH_TO_DATASET_FILE).subscribe(data => {
      this.dataSource = new MatTableDataSource(MovieService.parseFileContent(data, this.globals.NO_DATA_CHAR));
      this.createPaginatorAndSorting();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(row: Movie) {
    // Display popup when a row has been clicked
    const dialogRef = this.matDialog.open(PopupComponent);
    dialogRef.componentInstance.movie = row;
  }

  createPaginatorAndSorting() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.createPaginatorAndSorting();
  }

}
