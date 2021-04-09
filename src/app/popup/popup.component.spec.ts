import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GlobalVars } from '../shared/globals';
import { Movie } from '../models/movie.model';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatInputHarness } from '@angular/material/input/testing';


describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();
  let loader: HarnessLoader;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserModule,
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
        MatOptionModule,
        MatMenuModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })],
      providers: [
        GlobalVars,
        { provide: FormBuilder, useValue: formBuilder },
        { provide: MatDialogRef, useValue: {} }],
      declarations: [ PopupComponent ]
    })
      .compileComponents();
    httpClient = TestBed.inject(HttpClient);

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    const myMovie = new Movie('tt00001', 'short', 'movieTitle',
      'originalMovieTitle', false, 1984, 1985, 5, 'Action');
    component.movie = myMovie;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable save button when reference (tconst) is absent', async () => {
    const saveButton = (await loader.getAllHarnesses(MatButtonHarness))[0];
    expect(await saveButton.isDisabled()).toBeFalse();
    const tconstInput = (await loader.getAllHarnesses(MatInputHarness))[1];
    await tconstInput.setValue('');
    expect(await saveButton.isDisabled()).toBeTrue();
    expect(component.globalForm.valid).toBeFalse();
  });

  it('should disable save button when start year is more than 4 digits', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    const saveButton = buttons[0];
    expect(await saveButton.isDisabled()).toBeFalse();
    const startYearInput = (await loader.getAllHarnesses(MatInputHarness))[6];
    await startYearInput.setValue('12345');
    expect(await saveButton.isDisabled()).toBeTrue();
    expect(component.globalForm.valid).toBeFalse();
  });
});
