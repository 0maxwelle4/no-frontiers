import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';
import { Router ,RouterLink } from '@angular/router';
import {Location} from "@angular/common";

declare var Masonry: any;

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent implements AfterViewInit, OnInit {

  profesores: any = [];

  loading:boolean = true;

  ngAfterViewInit(): void {
    this.initializeMasonry();
  }

  constructor( private _profesoresService: ProfesoresService, private router:Router, private location: Location){}

  ngOnInit() {
    // You can load or initialize your profesores data here if needed
    this._profesoresService.usersAuth0().subscribe( params => {

      this.profesores = params;
      console.log(this.profesores);
      console.log(this.profesores[2].user_metadata.fotoPerfil)
    });
  }

  initializeMasonry() {
    const grid = document.querySelector('#masonry-grid');

    new Masonry(grid, {
      percentPosition: true
    });

    this.refresh();
  }

  refresh() {
    const isRefreshed = localStorage.getItem('isRefreshed');

    console.log(isRefreshed);

    if (isRefreshed !== 'true') {
      console.log('AAAAAAAAAAAAAAAAAAAA');
      window.location.reload();
      localStorage.setItem('isRefreshed', 'true');
    }else {
      setTimeout( () => {
        this.loading=false;
      },1500)
    }

  }

  PerfilProfesor( id:any ){

    console.log( id );
    this.router.navigate(['/profesor',id]);

  }

}
