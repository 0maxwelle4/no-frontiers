import {Component, OnInit} from '@angular/core';
import {ProfesoresService} from '../../services/profesores.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarComponent} from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent implements OnInit{

  allProfes: any = [];

  profesores: any[] = [];

  termino: string = "";

  constructor(private _profesoresservice: ProfesoresService, private _activateRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this._profesoresservice.usersAuth0().subscribe(params => {

      this.allProfes = params;


      this._activateRoute.params.subscribe((data: any) => {
        console.log('EEEEEEEEEEEEEEEEEEEEEEEEE')

        if (data.termino == "") {
          this.profesores = this.allProfes;

        } else {

          console.log(11111111111111111111,this.termino);
          this.termino = data.termino;
          console.log(2222222222222222222,this.termino);
          this.profesores = this._profesoresservice.buscarProfesor(data.termino, this.allProfes);
          console.log(this.profesores);
        }


      });

    });

  }

  PerfilProfesor(id: any) {

    console.log(id);
    this.router.navigate(['/profesor', id]);

  }

}
