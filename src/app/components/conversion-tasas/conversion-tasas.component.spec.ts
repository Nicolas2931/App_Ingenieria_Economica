import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionTasasComponent } from './conversion-tasas.component';

describe('ConversionTasasComponent', () => {
  let component: ConversionTasasComponent;
  let fixture: ComponentFixture<ConversionTasasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversionTasasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversionTasasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
