import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RazonesProporcionesComponent } from './razones-proporciones.component';

describe('RazonesProporcionesComponent', () => {
  let component: RazonesProporcionesComponent;
  let fixture: ComponentFixture<RazonesProporcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RazonesProporcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RazonesProporcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
