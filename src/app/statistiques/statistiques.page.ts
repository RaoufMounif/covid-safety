import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.page.html',
  styleUrls: ['./statistiques.page.scss'],
})
export class StatistiquesPage implements OnInit {
  myurl: any = "";
  constructor(private sanitizer: DomSanitizer, public platform: Platform) { }

  ngOnInit() {
    if (this.platform.is("desktop")) {
      this.myurl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6");
    }else{
      this.myurl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.arcgis.com/apps/opsdashboard/index.html#/85320e2ea5424dfaaa75ae62e5c06e61");

    }
  }

}
