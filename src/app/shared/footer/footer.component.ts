import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  goToEquipo() {
    localStorage.setItem('isRefreshed', 'false');
    //this.router.navigate(['equipo']);
  }

}
