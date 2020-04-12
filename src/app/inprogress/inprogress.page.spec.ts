import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InprogressPage } from './inprogress.page';

describe('InprogressPage', () => {
  let component: InprogressPage;
  let fixture: ComponentFixture<InprogressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InprogressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InprogressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
