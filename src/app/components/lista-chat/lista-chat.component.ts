import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { ProfesoresService } from '../../services/profesores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-chat',
  templateUrl: './lista-chat.component.html',
  styleUrl: './lista-chat.component.css'
})
export class ListaChatComponent implements OnInit, AfterViewInit {

  path: string = 'conversations';
  user:any = [];
  convsList:any = [];
  profesores: any = [];
  nombreProfesor:any[] = [];

  loading:boolean = true;

  ngAfterViewInit(): void {
    setTimeout(()=>{this.loading=false},1000);
  }

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private profesoresSerice: ProfesoresService,
    private router: Router
    ) { }

    ngOnInit(): void {

       this.authService.getUserProfile().subscribe( data => {
        console.log(data);
        this.user = data;
        this.profesoresSerice.usersAuth0().subscribe( params => {
          this.profesores = params;
          console.log(this.profesores);
          this.buscar();
        });
      } );

    }

    buscar(){
      this.chatService.searchWordInList(this.path).subscribe( data => {
        //Take all conversations in path
        let convsPath:any = data;
        //Take all the ids/titles of the conversations
        let claves = Object.keys(convsPath);
        //Compare if the user id is in it and put it in the conv list
        claves.forEach(element => {
          if (element.includes(this.user.sub)) {
            //AUN FALTA UNA VARIABLE DONDE GUARDAR LA LISTA
            console.log(element);
            console.log(convsPath[element]);
            this.convsList.push( convsPath[element] );
          }
        });
        this.getNames();
      })
    }

    getNames(){

      //IDEA: PONER EN EL IF Y COGER LAS PRIMAS LETRAS DESPUES DE AUTH0 PARA VER SI EL USUARIO ES EL PROFE Y ENTONCES AHI LLAMO A LA FUNCION DE COGER USER POR ID QUE TENGO QUE HACER EN AUTHSERVICE Y LO PONGO EN NAMEPROFE.
      for (let i = 0; i < this.convsList.length; i++) {
        let nameProfe:any="";
        let primerSms:any = Object.values(this.convsList[i])[0];
        let tresDigit:any = primerSms.participants.recipientId.split('|');
        console.log(tresDigit);
        
        console.log(primerSms.participants.recipientId);
        console.log(this.profesores)

        if (tresDigit[1].includes('-NtM2')) {
          //console.log("VAAAEAAARARARARARA")

          if (primerSms.participants.recipientId !== this.user.sub) {
            this.authService.getUserbyId(primerSms.participants.recipientId).subscribe( usario =>{
              console.log(usario);
              nameProfe = usario;
              this.nombreProfesor.push(nameProfe);
            });
          }else{
            this.authService.getUserbyId(primerSms.participants.userId).subscribe( usario =>{
              console.log(usario);
              nameProfe = usario;
              this.nombreProfesor.push(nameProfe);
            });
          }

          
          
          console.log(this.nombreProfesor);
        }

        else{

          if (primerSms.participants.recipientId !== this.user.sub) {
            nameProfe = this.profesoresSerice.buscarProfesorId(primerSms.participants.recipientId, this.profesores);
          }else{
            nameProfe = this.profesoresSerice.buscarProfesorId(primerSms.participants.userId, this.profesores);
          }
          console.log(nameProfe);
          this.nombreProfesor.push(nameProfe[0]);

        }

        console.log(this.nombreProfesor);

        
      }
    }

    irchat(id:string){

      this.router.navigate(['chat',id]);

    }

}
