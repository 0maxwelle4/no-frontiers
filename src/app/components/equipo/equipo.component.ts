import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';
import { Router ,RouterLink } from '@angular/router';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent implements AfterViewInit {

  profesores: any = [];

  loading:boolean = true;

  ngAfterViewInit(): void {
    setTimeout(()=>{this.loading=false},1000);
  }

  constructor( private _profesoresService: ProfesoresService, private router:Router ){

    this._profesoresService.usersAuth0().subscribe( params => {

      this.profesores = params;
      console.log(this.profesores);
    });
    

  }

  PerfilProfesor( id:any ){

    console.log( id );
    this.router.navigate(['/profesor',id]);

  }

}
