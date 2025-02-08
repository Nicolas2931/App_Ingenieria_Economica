import { TestBed } from '@angular/core/testing';

import { ConversionTasasService } from './conversion-tasas.service';
import { Periodos } from './periodos.enum';

describe('ConversionTasasService', () => {
  let service: ConversionTasasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversionTasasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convertir a nominal', () => {
    const j = 0.32;
    const n = 4;
    const m = 12;
    const i = service.convertir({ j, m: m, n });
    expect(i).toBeCloseTo(0.02598);
  });

  it('should convertir a efectiva', () => {
    const i = 0.02598;
    const n = 12;
    const m = 4;
    const j = service.convertir({ i, m: m, n });
    expect(j).toBeCloseTo(0.32);
  });

  it('should convertir a efectiva, luego a nominal', () => {
    const j = 0.38;
    const n = Periodos.MENSUAL
    const m = Periodos.BIMESTRE

    const i = service.convertir({ j, m, n })
    const j2 = service.convertir({ i, m, n: m })
    expect(j2).toBeCloseTo(0.386);
  });

  it('should convertir a nominal, luego a efectiva', () => {
    const i = 0.12;
    const n = Periodos.TRIMESTRE
    const m = Periodos.BIMESTRE

    const i2 = service.conversion_tasas(i, n, m)
    expect(i2).toBeCloseTo(0.0784);
  });
});
