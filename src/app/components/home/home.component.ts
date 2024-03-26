import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  profesores: any = [];

  profes:any = [];

  public loading = true;
  
  ngAfterViewInit(): void {
    setTimeout(()=>{this.loading=false},1000)
  }

  constructor( private _profesoresService: ProfesoresService, private router:Router ){

    this._profesoresService.usersAuth0().subscribe( params => {

      this.profesores = params;
      this.profes = this.profesores.slice(0,3);
    });
    console.log(this.profesores)

  }

  PerfilProfesor( id:any ){

    console.log( id );
    this.router.navigate(['/profesor',id]);

  }

}
