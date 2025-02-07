import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Periodos } from './app/services/periodos.enum';
import { ConversionTasasService } from './app/services/conversion-tasas.service';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));


const conversion = new ConversionTasasService()

const j = 0.32;
const m = Periodos.TRIMESTRE
// const i = conversion.nominal_efectiva(j,m)
const n = Periodos.MENSUAL

const i = conversion.convertir_tasa({ j, m, n })
console.log(i)