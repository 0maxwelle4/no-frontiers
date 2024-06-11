import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthService } from './auth.service';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfesoresService {


  URL: string = 'assets/server/profes.php';

  constructor( private http: HttpClient, private _authService: AuthService ) {}


  getProfesores(){

    return this.http.get(this.URL);

  }

  buscarProfesor( termino:string, profesores:any[] ){

    let profesMatch: any[] = [];

    profesores.forEach( profesor => {


      if( profesor.name.toLowerCase().includes(termino.toLowerCase()) ){

        console.log(profesor)
        profesMatch.push(profesor);


      }

    });

    return profesMatch;

  }


  buscarProfesorId( id:any, profesores:any[] ){

    let profe: any[] = [];

    profesores.forEach( profesor => {

      if( profesor.user_id == id ) {

        profe.push(profesor);

       }

    });

    return profe;

  }


  usersAuth0(){
    return from (this._authService.tokenApi()).pipe(
      switchMap(accessToken => {
        //console.log(accessToken);

        const url = `https://dev-u5hvg8wb8m85i4jl.eu.auth0.com/api/v2/users`;
        const param = new HttpParams()
            .set('q','app_metadata.role:"profesor"')
            .set('search_engine', 'v3');
        let header = new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        });

        return this.http.get<any>(url, { params : param, headers: header});
      })
    );
  }


}

