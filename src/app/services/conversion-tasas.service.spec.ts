import { TestBed } from '@angular/core/testing';

import { ConversionTasasService } from './conversion-tasas.service';

describe('ConversionTasasService', () => {
  let service: ConversionTasasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversionTasasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
