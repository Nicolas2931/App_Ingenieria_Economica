import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalizacionComponent } from './capitalizacion.component';

describe('CapitalizacionComponent', () => {
  let component: CapitalizacionComponent;
  let fixture: ComponentFixture<CapitalizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapitalizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapitalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
