import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'ProyectoFinal';

  constructor(private authService : AuthService, private preloader: LoadingService) {
    
  }

  ngOnInit(): void {
    this.authService.handleAuthentication();
  }

  ngAfterViewInit() {
    /* this.preloader.hide(); */
  }


}
