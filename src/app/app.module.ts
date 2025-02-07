import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableroComponent } from './layouts/tablero/tablero.component';
import { MenuComponent } from './components/menu/menu.component';
import { ServicioMensajesService } from './services/servicio-mensajes.service';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { ButtonComponent } from './components/inputs/button/button.component';
import { InteresCompuestoComponent } from './components/interes-compuesto/interes-compuesto.component';
import { ConversionTasasComponent } from './components/conversion-tasas/conversion-tasas.component';
import { AnualidadesComponent } from './components/anualidades/anualidades.component';
import { AmortizacionComponent } from './components/amortizacion/amortizacion.component';
import { CapitalizacionComponent } from './components/capitalizacion/capitalizacion.component';

@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    MenuComponent,
    TextInputComponent,
    ButtonComponent,
    InteresCompuestoComponent,
    ConversionTasasComponent,
    AnualidadesComponent,
    AmortizacionComponent,
    CapitalizacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),ServicioMensajesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
