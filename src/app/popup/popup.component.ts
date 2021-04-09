import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalVars } from '../shared/globals';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  // Current movie to modify
  movie: Movie;
  globalForm: FormGroup;
  private form: BehaviorSubject<FormGroup> = new BehaviorSubject(null);

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PopupComponent>,
              private globals: GlobalVars) { }

  ngOnInit(): void {
    // Form containing all the information about a particular movie that can be modified
    this.globalForm = this.fb.group({
      movie: this.fb.group({
        tconst: [this.movie.tconst, Validators.required],
        titleType: [this.movie.titleType, Validators.required],
        primaryTitle: [this.movie.primaryTitle, Validators.required],
        originalTitle: [this.movie.originalTitle, Validators.required],
        isAdult: [this.movie.isAdult, Validators.required],
        startYear: [this.movie.startYear, [CustomValidators.number, CustomValidators.gt(1000),
          CustomValidators.lt(9999), Validators.required]],
        endYear: [this.movie.endYear === this.globals.NO_DATA_CHAR ? '' : this.movie.endYear,
          [CustomValidators.number, CustomValidators.gt(1000), CustomValidators.lt(9999)]],
        runtimeMinutes: [this.movie.runtimeMinutes === this.globals.NO_DATA_CHAR ? '' :
          this.movie.runtimeMinutes, [CustomValidators.number]],
        genres: this.movie.genres === this.globals.NO_DATA_CHAR ? '' : this.movie.genres
      })
    });
    this.form.next(this.globalForm);
  }

  getForm(): Observable<FormGroup> {
    return this.form.asObservable();
  }

  save() {
    // So that we can check validity for all fields
    this.globalForm.markAllAsTouched();
    // Modify current movie from the form
    if (this.globalForm.valid) {
      this.movie.tconst = this.globalForm.get('movie.tconst').value;
      this.movie.titleType = this.globalForm.get('movie.titleType').value;
      this.movie.primaryTitle = this.globalForm.get('movie.primaryTitle').value;
      this.movie.originalTitle = this.globalForm.get('movie.originalTitle').value;
      this.movie.isAdult = this.globalForm.get('movie.isAdult').value;
      this.movie.startYear = this.globalForm.get('movie.startYear').value;
      this.movie.endYear = this.globalForm.get('movie.endYear').value ?
        this.globalForm.get('movie.endYear').value : this.globals.NO_DATA_CHAR;
      this.movie.runtimeMinutes = this.globalForm.get('movie.runtimeMinutes').value ?
        this.globalForm.get('movie.runtimeMinutes').value : this.globals.NO_DATA_CHAR;
      this.movie.genres = this.globalForm.get('movie.genres').value ?
        this.globalForm.get('movie.genres').value : this.globals.NO_DATA_CHAR;
      this.closeDialog();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
