import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import {verify} from "node:crypto";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit, AfterViewInit {

  perfil: any = [];

  loading:boolean = true;

  ngAfterViewInit(): void {
    setTimeout(()=>{this.loading=false},1000)
  }

  constructor( private authService: AuthService, private location: Location ) {

  }

  ngOnInit(): void {

    this.authService.getUserProfile().subscribe( data => {

      this.perfil = data;
      console.log(this.perfil)
      this.authService.metaData(this.perfil.sub).subscribe( data => console.log(data.app_metadata));

    } );


  }

  Atras(){
    this.location.back();
  }

  verify(){

  }
}
