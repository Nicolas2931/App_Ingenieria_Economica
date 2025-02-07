import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizacionComponent } from './amortizacion.component';

describe('AmortizacionComponent', () => {
  let component: AmortizacionComponent;
  let fixture: ComponentFixture<AmortizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmortizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmortizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
