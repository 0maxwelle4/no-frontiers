import { Component, OnChanges, OnInit, AfterContentInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  role:string ="";
  profe:boolean = false;

  constructor(
    private router: Router,
    private authService : AuthService
  ) {
    this.sesion();
  }

  ngOnInit(): void {
    this.sesion();
  }

  buscar(termino: any): void {
    this.router.navigate(['/buscar', termino]);  
  }

  login(){
    this.authService.login();
  }

  logout(){

    this.authService.logout();

  }

  isLoggedIn(): boolean {

    return this.authService.isAuthenticated();

  }

  sesion(){    
    this.authService.getUserProfile().subscribe( user => {
      this.authService.metaData(user.sub).subscribe( data => {
        if(data.app_metadata.role){
          this.profe = true;     
        }
      })
    })
  }
  
}  
 