import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFirestore } from '@angular/fire/firestore';
import { Question } from '../folder/Question';
import { QuestionnaireObjet } from '../shared/QuestionnaireObject';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public questions: Question[];
  constructor(private activatedRoute: ActivatedRoute, private db: AngularFireDatabase, private firestore: AngularFirestore) { }


  ngOnInit() {
    this.db.list('/infosPerso').valueChanges().subscribe(res => {
      this.questions = <Question[]>res;
    });
  }
  updateScore(desc:string , answer :boolean|string|number){
    QuestionnaireObjet[desc] = answer;
    if(typeof(answer) === "boolean"){
      if(answer){
        QuestionnaireObjet.PRONOSTIQUE = true;
        QuestionnaireObjet.PRONOSTIQUE_VALUE++;
      }
    }

  }

  
}
