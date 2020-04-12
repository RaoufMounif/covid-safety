import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Questionnaire',
      url: '/folder/Questionnaire',
      icon: 'document-text'
    },
    {
      title: 'Statistique',
      url: 'statistiques',
      icon: 'analytics'
    },
    {
      title: 'Conseil',
      url: 'inprogress',
      icon: 'bulb'
    },
    {
      title: 'A propos',
      url: 'inprogress',
      icon: 'information'
    },

  ];
  public labels = ['WHO', 'GOUVE.COVID-19', 'N° vert', 'SOS', 'Nous contacter', 'FAQ'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
