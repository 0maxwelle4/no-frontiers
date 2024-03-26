import { Component } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {

  allProfes: any = [];

  profesores: any[] = [];

  termino:string = "";

  constructor( private _profesoresservice: ProfesoresService, private _activateRoute: ActivatedRoute, private router: Router ){

    this.getProfesFromService();

    this._activateRoute.params.subscribe( (data:any) => {

      if( data.termino == "" ){
        this.profesores = this.allProfes;
        //router.navigate(['equipo']);

      }else{

        this.termino = data.termino;
        this.profesores = this._profesoresservice.buscarProfesor( this.termino, this.allProfes );

      }


    });
    

  }

  getProfesFromService(){

    this._profesoresservice.usersAuth0().subscribe( params => {

      this.allProfes = params;

    });

  }

  PerfilProfesor( id:any ){

    console.log( id );
    this.router.navigate(['/profesor',id]);

  }

}
