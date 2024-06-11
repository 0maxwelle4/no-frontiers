import { Component } from '@angular/core';
import { AuthProfeService } from '../../services/auth-profe.service';

@Component({
  selector: 'app-register-profes',
  templateUrl: './register-profes.component.html',
  styleUrl: './register-profes.component.css'
})
export class RegisterProfesComponent {

  loading:boolean = true;
  imageSrc: any = "";

  ngAfterViewInit(): void {
    setTimeout(()=>{this.loading=false},1000)
  }
  constructor( private _authProfe: AuthProfeService){}

  loginProfe(name:HTMLInputElement,apell:HTMLInputElement,mail:HTMLInputElement,password:HTMLInputElement,desc:HTMLTextAreaElement){

    if (this.validarForm(name,apell,mail,password,desc)) {

      this._authProfe.enviarSolicitud(name.value,apell.value,mail.value,password.value,desc.value,this.imageSrc);
      this._authProfe.listaSolicitudes().subscribe(data => console.log(data));

      name.value='';
      apell.value='';
      mail.value='';
      password.value='';
      desc.value='';

      name.classList.remove('is-valid');
      apell.classList.remove('is-valid');
      mail.classList.remove('is-valid');
      password.classList.remove('is-valid');
      desc.classList.remove('is-valid');
      name.focus();
    }

  }

  previewImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        const base64WithoutHeader = base64String.split(',')[1]; // Extract base64 string without header
        const blob = this.base64ToBlob(base64WithoutHeader);

        // Set imageSrc to display the preview
        this.imageSrc = base64WithoutHeader;

        console.log(base64WithoutHeader);
      };
      reader.readAsDataURL(file);
    }
  }

  base64ToBlob(base64String: string): Blob {
    const byteString = atob(base64String);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: 'image/jpeg'}); // Adjust the type according to your image type
  }

  validarForm(name:HTMLInputElement,apell:HTMLInputElement,mail:HTMLInputElement,password:HTMLInputElement,desc:HTMLTextAreaElement): boolean{

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valido = true;
    let divDuplicado = document.getElementById("duplicado");

    if (name.value.length < 1) {
      name.classList.add('is-invalid');
      valido = false;
    }else{
      name.classList.remove('is-invalid');
      name.classList.add('is-valid');
    }

    if (apell.value.length < 1) {
      apell.classList.add('is-invalid');
      valido = false;
    }else{
      apell.classList.remove('is-invalid');
      apell.classList.add('is-valid');
    }

    if (!emailPattern.test(mail.value) ) {
      mail.classList.add('is-invalid');
      valido = false;
    }else{
      mail.classList.remove('is-invalid');
      mail.classList.add('is-valid');
    }

    if (!passwordPattern.test(password.value)) {
      password.classList.add('is-invalid');
      valido = false;
    }else{
      password.classList.remove('is-invalid');
      password.classList.add('is-valid');
    }

    if (desc.value.length < 1) { //// AQUI 150
      desc.classList.add('is-invalid');
      valido = false;
    }else{
      desc.classList.remove('is-invalid');
      desc.classList.add('is-valid');
    }

    return valido;

  }

  checkMail(mail:string):boolean{

    let duplicado:boolean = false;

    this._authProfe.listaSolicitudes().subscribe( lista =>{
      lista.forEach( (soli:any) => {
        if (soli.email == mail) {
          duplicado = true;
          console.log(soli.email);
        }
      });

      return duplicado;

    })

    return duplicado;

  }

}
