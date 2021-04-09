import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  siteLanguage = 'EN';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
  }

  changeLanguage(language: string) {
    this.siteLanguage = language;
    this.translate.use(language.toLocaleLowerCase());
  }

}
