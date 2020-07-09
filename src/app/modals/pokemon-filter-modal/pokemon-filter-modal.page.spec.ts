import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PokemonFilterModalPage } from './pokemon-filter-modal.page';

describe('PokemonFilterModalPage', () => {
  let component: PokemonFilterModalPage;
  let fixture: ComponentFixture<PokemonFilterModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonFilterModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonFilterModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
