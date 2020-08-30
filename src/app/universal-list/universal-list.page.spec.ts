import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UniversalListPage } from './universal-list.page';

describe('UniversalListPage', () => {
  let component: UniversalListPage;
  let fixture: ComponentFixture<UniversalListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UniversalListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
