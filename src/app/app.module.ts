import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule} from '@angular/forms';

//SERVICIOS
import { ProfesoresService } from "./services/profesores.service";

//RUTAS
import { FeatureRoutingModule } from "./app.routes";
import { AboutComponent } from './components/about/about.component';
import { EquipoComponent } from './components/equipo/equipo.component';

//HTTP GET
import { HttpClientModule } from "@angular/common/http";
import { DetallesProfesoresComponent } from './components/detalles-profesores/detalles-profesores.component';
import { BuscadorComponent } from './components/buscador/buscador.component';


//AUTH0
import { AuthService } from './services/auth.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ChatComponent } from './components/chat/chat.component';

//CHAT
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { ListaChatComponent } from './components/lista-chat/lista-chat.component';
import { RegisterProfesComponent } from './components/register-profes/register-profes.component';
import { PeticionesComponent } from './components/peticiones/peticiones.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { NoimagePipe } from './Pipes/noimage.pipe';
import { ConvertBase64Pipe } from './Pipes/convert-base64.pipe';
import { ManageComponent } from './components/manage/manage.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    EquipoComponent,
    DetallesProfesoresComponent,
    BuscadorComponent,
    PerfilComponent,
    ChatComponent,
    ListaChatComponent,
    RegisterProfesComponent,
    PeticionesComponent,
    LoadingComponent,
    NoimagePipe,
    ConvertBase64Pipe,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeatureRoutingModule,
    HttpClientModule,
    AngularFirestoreModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    provideClientHydration(),
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
