import { Component, OnInit } from '@angular/core';
import { QuestionnaireResult } from '../shared/QuestionnaireResult';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
result : QuestionnaireResult;
  constructor() { }

  ngOnInit() {
    this.result = QuestionnaireResult;
  }
  getColor(gravite) {
    switch (gravite) {
      case 'warning':
        return 'orang';
      case 'danger':
        return 'red';
      case 'safe':
        return 'green';
    }
  }
}
