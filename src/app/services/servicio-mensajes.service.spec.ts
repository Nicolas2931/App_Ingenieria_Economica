import { TestBed } from '@angular/core/testing';

import { ServicioMensajesService } from './servicio-mensajes.service';

describe('ServicioMensajesService', () => {
  let service: ServicioMensajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioMensajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
