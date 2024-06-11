import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesoresService } from '../../services/profesores.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalles-profesores',
  templateUrl: './detalles-profesores.component.html',
  styleUrl: './detalles-profesores.component.css'
})
export class DetallesProfesoresComponent {

  profesorDetalles: any = [];

  allProfes:any = [];

  id: any = "";

  constructor( private _activatedRoute: ActivatedRoute, private _profesoresService: ProfesoresService, private router:Router, private location: Location ){

    this._activatedRoute.params.subscribe( (data:any) => {

      this.id = data.id;
      this.getProfesFromService();

    });

  }

  getProfesFromService(){

    this._profesoresService.usersAuth0().subscribe( params => {

      this.allProfes = params;
      console.log(this.allProfes)
      this.profesorDetalles = this._profesoresService.buscarProfesorId( this.id, this.allProfes );
      console.log(this.profesorDetalles)
    });

  }


  regresar(){
    localStorage.setItem('isRefreshed', 'false');
    this.location.back();
    /* this.router.navigate(['equipo']); */

  }

  chat(){

    this.router.navigate(['chat',this.id]);

  }

}
