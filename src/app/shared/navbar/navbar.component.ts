import { Component, OnChanges, OnInit, AfterContentInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  role:string ="";
  profe:boolean = false;
  gerente:boolean = false;
  avatarImg: any = "";

  constructor(
    private router: Router,
    private authService : AuthService
  ) {}

  ngOnInit(): void {

    setTimeout( () => {
      this.avatarImg = localStorage.getItem('picture') || 'https://github.com/mdo.png';
      this.sesion();
    },900);
  }

  goToEquipo() {
    localStorage.setItem('isRefreshed', 'false');
    //this.router.navigate(['equipo']);
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
      this.avatarImg = user.picture;
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',user);

      this.authService.metaData(user.sub).subscribe( data => {

        if(data.app_metadata?.role == 'profesor'){
          this.profe = true;
        }

        if (data.app_metadata?.role == 'gerente') {
          this.gerente = true;
        }
      })

    })
  }

}
