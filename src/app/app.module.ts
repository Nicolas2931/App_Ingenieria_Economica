import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableroComponent } from './layouts/tablero/tablero.component';
import { MenuComponent } from './components/menu/menu.component';
import { RazonesProporcionesComponent } from './components/razones-proporciones/razones-proporciones.component';
import { InteresSimpleComponent } from './components/interes-simple/interes-simple.component';
import { ServicioMensajesService } from './services/servicio-mensajes.service';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    MenuComponent,
    RazonesProporcionesComponent,
    InteresSimpleComponent,
    TextInputComponent
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
