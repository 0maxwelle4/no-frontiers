import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from "./components/home/home.component";
import { EquipoComponent } from "./components/equipo/equipo.component";
import { AboutComponent } from "./components/about/about.component";
import { DetallesProfesoresComponent } from "./components/detalles-profesores/detalles-profesores.component";
import { BuscadorComponent } from './components/buscador/buscador.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListaChatComponent } from './components/lista-chat/lista-chat.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterProfesComponent } from './components/register-profes/register-profes.component';
import { PeticionesComponent } from './components/peticiones/peticiones.component';
import {ManageComponent} from "./components/manage/manage.component";

const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'equipo', component: EquipoComponent},
    { path: 'about', component: AboutComponent},
    // { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
    { path: 'perfil', component: PerfilComponent},
    { path: 'profesor/:id', component: DetallesProfesoresComponent, canActivate: [AuthGuard]},
    { path: 'chat/:id', component: ChatComponent, canActivate: [AuthGuard]},
    { path: 'buscar/:termino', component: BuscadorComponent},
    { path: 'resgisterProfes', component: RegisterProfesComponent},
    { path: 'peticiones', component: PeticionesComponent},
    { path: 'manejar', component: ManageComponent},
    { path: 'conversaciones', component: ListaChatComponent, canActivate: [AuthGuard]},
    { path: '**', pathMatch: 'full', redirectTo:'home' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule {}
