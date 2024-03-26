import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Router } from '@angular/router';
import  * as CryptoJS from "crypto-js";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthProfeService {

  autentificado:boolean = false;
  private readonly localStorageKey = 'currentUser';

  constructor(private db: AngularFireDatabase,private router: Router, private _authService: AuthService) {}

  enviarSolicitud(name:string,apell:string,mail:string,password:any,desc:any){

    const solicitudKey = this.generateUniqueKey(); // Generate unique key
    this.db.list(`/solicitudes`).push({
      nombre: name,
      apellido: apell,
      email: mail,
      password: password,
      descripcion: desc,
      foto: '',
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
      picture: profesor.foto || 'https://example.com/profile.jpg',
      user_id: profesor.id,
      given_name: profesor.nombre,
      family_name: profesor.apellido,
      name: `${profesor.nombre} ${profesor.apellido}`,
      nickname: 'TCH',
      connection: "Username-Password-Authentication",
      password: profesor.password,
      verify_email: true
    }    
    this.db.list(`/`).set(`/CuentasProfesores/${profesor.id}`,{nuevoProfe});
    this.db.list(`/solicitudes`).remove(profesor.id);
    this._authService.CrearProfesor(nuevoProfe).subscribe(data => console.log(data));
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
