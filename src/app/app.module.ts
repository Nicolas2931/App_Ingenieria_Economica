import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicioMensajesService } from './servicio-mensajes.service';
import { TableroComponent } from './tablero/tablero.component';
import { MenuComponent } from './menu/menu.component';
import { RazonesProporcionesComponent } from './razones-proporciones/razones-proporciones.component';
import { InteresSimpleComponent } from './interes-simple/interes-simple.component';

@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    MenuComponent,
    RazonesProporcionesComponent,
    InteresSimpleComponent
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
