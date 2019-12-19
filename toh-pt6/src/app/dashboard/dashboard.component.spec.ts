import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { TreinadorSearchComponent } from '../treinador-search/treinador-search.component';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HEROES } from '../mock-treinadores';
import { TreinadorService } from '../treinador.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let treinadorService;
  let getTreinadoresSpy;

  beforeEach(async(() => {
    treinadorService = jasmine.createSpyObj('TreinadorService', ['getTreinadores']);
    getTreinadoresSpy = treinadorService.getTreinadores.and.returnValue( of(HEROES) );
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        TreinadorSearchComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: TreinadorService, useValue: treinadorService }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Treinadores" as headline', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual('Top Treinadores');
  });

  it('should call treinadorService', async(() => {
    expect(getTreinadoresSpy.calls.any()).toBe(true);
    }));

  it('should display 4 links', async(() => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  }));

});
