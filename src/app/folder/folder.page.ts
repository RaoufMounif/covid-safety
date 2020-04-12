import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFirestore } from '@angular/fire/firestore';

import { Question } from './Question';
import { DomSanitizer } from '@angular/platform-browser';
import { QuestionnaireObjet } from '../shared/QuestionnaireObject';
import { QuestionnaireResult } from '../shared/QuestionnaireResult';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public questions: Question[]
  public score: number;
  public scoreMaj: number;
  public scoreMin: number;
  myurl: any = "";
  constructor(private activatedRoute: ActivatedRoute, private db: AngularFireDatabase, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.db.list('/questions').valueChanges().subscribe(res => {
      this.questions = <Question[]>res;
    });
    this.score = 0;
    this.scoreMaj = 0;
    this.scoreMin = 0;
    QuestionnaireObjet.IMC = QuestionnaireObjet.POIDS / ((QuestionnaireObjet.TAILLE * QuestionnaireObjet.TAILLE) / 10000);
    if (QuestionnaireObjet.IMC > 30) {
      QuestionnaireObjet.PRONOSTIQUE = true;
      QuestionnaireObjet.PRONOSTIQUE_VALUE++;
    }
    if (QuestionnaireObjet.AGE === ">= 70 ans") {
      QuestionnaireObjet.PRONOSTIQUE = true;
      QuestionnaireObjet.PRONOSTIQUE_VALUE++;
    }
  }

  upScore() {
    this.score++;
    this.scoreMaj++;
    this.scoreMin++;
  }
  downScore() {
    this.score--;
  }

  calculateResult() {
    //3.1
    if (QuestionnaireObjet.AGE === "< 15 ans") {
      QuestionnaireResult.message = "Prenez contact avec votre médecin généraliste au moindre doute. Cette application n’est pour l’instant pas adaptée aux personnes de moins de 15 ans.En cas d’urgence, appeler le 15.";
      QuestionnaireResult.gravite = "warning"
    }
    //3.2
    if (QuestionnaireObjet.IMPOSSIBILITE_DE_VOUS_ALIMENTER_OU_BOIRE || QuestionnaireObjet.MANQUE_DE_SOUFFLEI_NHABITUEL) {
      QuestionnaireResult.message = "Appeler le 15.";
      QuestionnaireResult.gravite = "danger"
    }
    //3.3
    if (QuestionnaireObjet.FIEVRE_DERNIERS_JOURS && QuestionnaireObjet.AUGMENTATION_TOUX_HABITUELLE) {
      if (!QuestionnaireObjet.PRONOSTIQUE) {
        QuestionnaireResult.message = "Votre situation peut relever d’un COVID 19.Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile (SOS médecins, etc.) "
        QuestionnaireResult.gravite = "warning"

      } else if (QuestionnaireObjet.PRONOSTIQUE_VALUE >= 1) {
        if (QuestionnaireObjet.FACTEURS_MINEUR < 2 && QuestionnaireObjet.FACTEURS_MINEUR >= 0) {
          QuestionnaireResult.message = "Votre situation peut relever d’un COVID 19.Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile (SOS médecins, etc.) "
          QuestionnaireResult.gravite = "warning"
        } else if (QuestionnaireObjet.FACTEURS_MINEUR >= 2) {
          QuestionnaireResult.message = "Votre situation peut relever d’un COVID 19.Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile.Si vous n'arrivez pas à obtenir de consultation, appelez le 15."
          QuestionnaireResult.gravite = "danger"

        }
      }
    }
    //3.4
    //avec fièvre ou (sans fièvre et avec (diarrhée ou (toux et douleurs)ou (toux et anosmie)) 
    if (QuestionnaireObjet.FIEVRE_DERNIERS_JOURS) {
      if (!QuestionnaireObjet.PRONOSTIQUE) {
        if (QuestionnaireObjet.FACTEURS_MINEUR == 0) {
          QuestionnaireResult.message = "Votre situation peut relever d’un COVID 19 qu’il faut surveiller.Si de nouveaux symptômes apparaissent, refaites le test ou consultez votre médecin.Nous vous conseillons de rester à votre domicile"
          QuestionnaireResult.gravite = "warning";
        } else if (QuestionnaireObjet.AGE === ">= 15 et < 50 ans") {
          QuestionnaireResult.message = "Votre situation peut relever d’un COVID 19 qu’il faut surveiller.Si de nouveaux symptômes apparaissent, refaites le test ou consultez votre médecin.Nous vous conseillons de rester à votre domicile"
          QuestionnaireResult.gravite = "warning";
        } else {
          QuestionnaireResult.message = " Votre situation peut relever d’un COVID 19.Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile.Appelez le 15 si une gêne respiratoire ou des difficultés importantes pour vous alimenter ou boire apparaissent pendant plus de 24 heures."
          QuestionnaireResult.gravite = "warning";
        }
      } else {
        if (QuestionnaireObjet.FACTEURS_MINEUR == 0 || QuestionnaireObjet.FACTEURS_MINEUR == 1) {
          QuestionnaireResult.message = " Votre situation peut relever d’un COVID 19.Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile.Appelez le 15 si une gêne respiratoire ou des difficultés importantes pour vous alimenter ou boire apparaissent pendant plus de 24 heures."
          QuestionnaireResult.gravite = "warning";

        } else if (QuestionnaireObjet.FACTEURS_MINEUR >= 2) {
          QuestionnaireResult.message = "Votre situation peut relever d’un COVID 19.Demandez une téléconsultation ou un médecin généraliste ou une visite à domicile. Si vous n'arrivez pas à obtenir de consultation, appelez le 15."
          QuestionnaireResult.gravite = "warning";
        }
      }
    } else if (QuestionnaireObjet.AUGMENTATION_TOUX_HABITUELLE || QuestionnaireObjet.MAL_DE_GORGE_OU_DOULEURS_MUSCULAIRES_OU_COURBATURES || QuestionnaireObjet.DIMINUTION_GOÛT_OU_ODORAT) {
      //3.5

      if (QuestionnaireObjet.PRONOSTIQUE_VALUE >= 1) {
        QuestionnaireResult.message = "  Votre situation peut relever d’un COVID 19. Un avis médical est recommandé.Au moindre doute, appelez le 15. Nous vous conseillons de rester à votre domicile. "
        QuestionnaireResult.gravite = "warning"
      }
      if (QuestionnaireObjet.PRONOSTIQUE_VALUE == 0) {
        QuestionnaireResult.message = " Votre situation peut relever d’un COVID 19 qu’il faut surveiller.Si de nouveaux symptômes apparaissent, refaites le test ou consultez votre médecin.Nous vous conseillons de rester à votre domicile. "
        QuestionnaireResult.gravite = "warning"

      }

    }else{
      QuestionnaireResult.message = " Votre situation ne relève probablement pas du COVID 19.N’hésitez pas à contacter votre médecin en cas de doute.Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation.Pour toute information concernant le COVID 19, composer le 0 800 130 000. "
        QuestionnaireResult.gravite = "safe"

    }
  }
  updateScore(desc: string, answer: boolean | string | number) {
    QuestionnaireObjet[desc] = answer;
    if (desc === "TEMPERATURE_PLUS_ELEVEE") {
      if (answer === "<35.4" || answer === ">= 39") {
        QuestionnaireObjet.FACTEURS_MINEUR++;
      }
    } if (desc === "REPOSER_PLUS_DE_LA_MOITIE_DE_LA_JOURNEE" && QuestionnaireObjet.FATIGUE_INHABITUELLE) {
      QuestionnaireObjet.FACTEURS_MINEUR++;
    }


  }


  postQuestionnaire() {

    this.db.list("questions").push({

      "answers": ["<35.4ssssss", "Entre 35,5 et 37,7ssssss", "entre 37,8 et 38,9sss"],
      "text": "Quelle ssssssssssa été votre température la plus élevée ces dernières 48h ?  ",
      "type": "binairessssssss"

    })

  }


}

//useful links 
//https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6
//https://www.arcgis.com/apps/opsdashboard/index.html#/85320e2ea5424dfaaa75ae62e5c06e61