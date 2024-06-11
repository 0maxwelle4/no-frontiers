import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProfesoresService } from '../../services/profesores.service';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {

  profesores: any = [];

  profes:any = [];

  public loading = true;

  constructor( private _profesoresService: ProfesoresService,
               private router:Router,
               private authService: AuthService){}

  ngOnInit() {
    this._profesoresService.usersAuth0().subscribe( params => {

      this.profesores = params;
      this.profes = this.profesores.slice(0,3);
      console.log(this.profesores)
    });

  }

  ngAfterViewInit(): void {
    setTimeout(()=>{this.loading=false},1500)
  }

  PerfilProfesor( id:any ){

    console.log( id );
    this.router.navigate(['/profesor',id]);

  }

  formMail(form: NgForm) {
    // Mark all controls as touched
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      control.markAsTouched({ onlySelf: true });
    });

    // Validación del nombre
    if (!form.controls['name'].value) {
      form.controls['name'].setErrors({ 'required': true });
    }

    // Validación del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.controls['email'].value || !emailPattern.test(form.controls['email'].value)) {
      form.controls['email'].setErrors({ 'required': true, 'email': true });
    }

    // Validación del número de teléfono
    const phonePattern = /^[0-9]{9}$/;
    if (!form.controls['phone'].value || !phonePattern.test(form.controls['phone'].value)) {
      form.controls['phone'].setErrors({ 'required': true, 'pattern': true });
    }

    // Validación del mensaje
    if (!form.controls['mensaje'].value) {
      form.controls['mensaje'].setErrors({ 'required': true });
    }

    // Enviar el formulario si es válido
    if (form.valid) {
      // Aquí iría la lógica para enviar el formulario
      this.sendEmail(form.value.name, form.value.email, form.value.phone, form.value.mensaje);
    }
  }


  sendEmail(name: any, mail: any, phone: any, message: any) {
    const templateId = 'template_r1hv71p';
    const templateParams = {
      to_name: 'No Frontiers',
      from_name: 'No Frontiers',
      message: `Nombre: ${name}\nEmail: ${mail}\nTelefono: ${phone}\nMensaje:\n${message}`
    };

    this.authService.sendEmail(templateId, templateParams).then(
      (response) => {
        console.log('Email sent successfully:', response);
        // Handle success
      },
      (error) => {
        console.error('Error sending email:', error);
        // Handle error
      }
    );

  }

}
