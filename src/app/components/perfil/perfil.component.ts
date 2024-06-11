import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import {verify} from "node:crypto";
import {AuthProfeService} from "../../services/auth-profe.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit, AfterViewInit {

  perfil: any = [];
  imageSrc: any = "";
  changeDesc: boolean = false;

  loading:boolean = true;

  ngAfterViewInit(): void {
    setTimeout(()=>{this.loading=false},1000)
  }

  constructor( private authService: AuthService,
               private location: Location,
               private _profesService: AuthProfeService) {

  }

  ngOnInit(): void {

    this.authService.getUserProfile().subscribe( data => {

      this.perfil = data;
      console.log(this.perfil)
      this.authService.metaData(this.perfil.sub).subscribe( data => {
        this.perfil = data;
        console.log(data)
      });

    } );


  }

  Atras(){
    this.location.back();
  }

  isGoogle(): boolean {
    return this.perfil?.identities[0].connection !== 'google-oauth2';
  }

  verify(){

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

        this._profesService.uploadImageOnline(this.imageSrc).subscribe( (imageData: any) => {
          this.authService.updatePicture(this.perfil.user_id, imageData.data.url).subscribe( response => {
            this.perfil.picture = imageData.data.url;
            console.log(response);
          });
        })
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

  updateProfesorDesc(descripcion: string) {
    this.authService.updateProfesorDesc(this.perfil.user_id, descripcion).subscribe(response => {
      console.log(response);
      this.perfil.user_metadata.descripcion = descripcion;
      this.changeDesc = !this.changeDesc
    })
  }
}
