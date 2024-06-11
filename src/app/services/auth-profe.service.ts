import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Router } from '@angular/router';
import  * as CryptoJS from "crypto-js";
import { AuthService } from './auth.service';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthProfeService {

  autentificado:boolean = false;
  private readonly localStorageKey = 'currentUser';
  private apiImageUrl = 'https://api.imgbb.com/1/upload?expiration=15552000&key=5c314ade97137ecb2c1b88c6b02b504b';

  constructor(private db: AngularFireDatabase,private router: Router,
              private _authService: AuthService,
              private http: HttpClient) {}

  enviarSolicitud(name:string,apell:string,mail:string,password:any,desc:any, foto: any){

    const solicitudKey = this.generateUniqueKey(); // Generate unique key
    this.db.list(`/solicitudes`).push({
      nombre: name,
      apellido: apell,
      email: mail,
      password: password,
      descripcion: desc,
      foto: foto,
      timestamp: Date.now()
    }).then(() => {
      console.log('Solicitud enviada successfully with key:', solicitudKey);
    }).catch(error => {
      console.error('Error sending solicitud:', error);
    });

  }

  listaSolicitudes(){
    const conversationRef = this.db.list(`/solicitudes`).snapshotChanges();
    return conversationRef;
  }

  aceptarProfesor(profesor:Professor){
    const formData = new FormData();
    formData.append('image', profesor.foto);

    let nuevoProfe = {
      email: profesor.email,
      user_metadata: {
        descripcion: profesor.descripcion,
      },
      blocked: false,
      email_verified: true,
      app_metadata: {
        role: "profesor"
      },
      picture: "",
      user_id: profesor.id,
      given_name: profesor.nombre,
      family_name: profesor.apellido,
      name: `${profesor.nombre} ${profesor.apellido}`,
      nickname: 'TCH',
      connection: "Username-Password-Authentication",
      password: profesor.password,
      verify_email: true
    }

    if (profesor.foto !== "") {

      this.http.post(this.apiImageUrl, formData).subscribe( (imageData: any) => {

        nuevoProfe.picture = imageData.data;

        this.db.list(`/`).set(`/CuentasProfesores/${profesor.id}`,{nuevoProfe});
        this.db.list(`/solicitudes`).remove(profesor.id);
        this._authService.CrearProfesor(nuevoProfe).subscribe(data => console.log(data));

      });

    }else {

      nuevoProfe.picture = 'https://i.ibb.co/vJdBBPb/no-profe-profile.jpg';

      this.db.list(`/`).set(`/CuentasProfesores/${profesor.id}`,{nuevoProfe});
      this.db.list(`/solicitudes`).remove(profesor.id);
      this._authService.CrearProfesor(nuevoProfe).subscribe(data => console.log(data));
    }


  }

  uploadImageOnline(imageBase64: any ) {
    const formData = new FormData();
    formData.append('image', imageBase64);

    return this.http.post(this.apiImageUrl, formData);
  }

  rechazarPeticion(profesor:Professor){
    this.db.list(`/solicitudes`).remove(profesor.id);
  }

  private hashEmail(email: string): string {
    // Hash the email using SHA-256
    const hashedEmail = CryptoJS.SHA256(email).toString(CryptoJS.enc.Hex);
    return hashedEmail;
  }

  private generateUniqueKey(): string {
    return this.db.createPushId(); // Using AngularFire's method to generate a unique ID
  }

}

interface Professor{
  descripcion:string,
  email:string,
  foto:any,
  nombre:string,
  apellido:string,
  password:any,
  id:any,
  timestamp: number
}
