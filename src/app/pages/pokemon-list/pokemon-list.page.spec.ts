import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PokemonListPage } from './pokemon-list.page';

describe('PokemonListPage', () => {
  let component: PokemonListPage;
  let fixture: ComponentFixture<PokemonListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
