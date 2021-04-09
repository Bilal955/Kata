export class Movie {
  tconst: string;
  titleType: string;
  primaryTitle: string;
  originalTitle: string;
  isAdult: boolean;
  startYear: number;
  endYear: number | string;
  runtimeMinutes: number | string;
  genres: string;

  constructor(tconst: string, titleType: string, primaryTitle: string, originalTitle: string,
              isAdult: boolean, startYear: number, endYear: number | string, runtimeMinutes: number | string, genres: string) {
    this.tconst = tconst;
    this.titleType = titleType;
    this.primaryTitle = primaryTitle;
    this.originalTitle = originalTitle;
    this.isAdult = isAdult;
    this.startYear = startYear;
    this.endYear = endYear;
    this.runtimeMinutes = runtimeMinutes;
    this.genres = genres;
  }
}
