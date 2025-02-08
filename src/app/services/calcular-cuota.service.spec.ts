import { TestBed } from '@angular/core/testing';

import { CalcularCuotaService } from './calcular-cuota.service';

describe('CalcularCuotaService', () => {
  let service: CalcularCuotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcularCuotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
