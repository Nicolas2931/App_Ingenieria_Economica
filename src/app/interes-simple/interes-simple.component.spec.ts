import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresSimpleComponent } from './interes-simple.component';

describe('InteresSimpleComponent', () => {
  let component: InteresSimpleComponent;
  let fixture: ComponentFixture<InteresSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InteresSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteresSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
