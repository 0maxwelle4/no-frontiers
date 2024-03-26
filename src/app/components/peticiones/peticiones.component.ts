import { Component } from '@angular/core';
import { AuthProfeService } from '../../services/auth-profe.service';
import { AuthService } from '../../services/auth.service';
import { ProfesoresService } from '../../services/profesores.service';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrl: './peticiones.component.css'
})
export class PeticionesComponent {

  peticiones:any[] = [];
  loading:boolean = true;

  ngAfterViewInit(): void {
    setTimeout(()=>{this.loading=false},1000)
  }

  constructor( private _authProfes: AuthProfeService ) {
    this.listaPeticiones();
  }

  listaPeticiones(){
    this._authProfes.listaSolicitudes().subscribe( data => {
      data.forEach( element => {
        let profe:any = element.payload.val();
        profe.id = element.key;
        this.peticiones.push(profe);
        
      });       
      console.log(this.peticiones);
    });
  }



  aceptarPeticion(peticion:Professor){
    console.log(peticion);
    this._authProfes.aceptarProfesor(peticion);
    this.peticiones = [];
  }

  BorrarPeticion(peticion:any){
    console.log(peticion.id);
    this._authProfes.rechazarPeticion(peticion);
    this.peticiones = [];
  }


}

interface Professor{
  descripcion:string,
  email:string,
  foto:any,
  id:any,
  nombre:string,
  apellido: string,
  password:any,
  timestamp: number
}