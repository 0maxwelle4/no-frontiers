// chat.component.ts
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewInit {

  id:any = [];
  user:any = [];
  conversations:any = [];
  path: string = 'conversations';
  profePicture: any = "";

  loading:boolean = true;

  ngAfterViewInit(): void {
    setTimeout(()=>{this.loading=false},1000);
  }

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {

  }


  ngOnInit(): void {

    this._activatedRoute.params.subscribe( (data:any) => {

      this.id = data.id;
      this.authService.getUserProfile().subscribe( data => {
        console.log(data);
        this.user = data;
        this.profePicture = localStorage.getItem('pictureProfe') || 'https://bootdey.com/img/Content/avatar/avatar1.png';
        this.chatService.getConversation(this.user.sub,this.id).subscribe( data => this.conversations = data);
      } );

    })
  }

  Atras(){
    this.location.back();
  }

  enviar(mensaje: HTMLInputElement){

    if (mensaje.value == "") {
      mensaje.focus();
    }else{
      this.chatService.sendMessage(mensaje.value,this.user.sub,this.id);
      mensaje.value = '';
      mensaje.focus();
    }

    let divChat = document.getElementById("miChat");
    if(divChat !== null){
      divChat.scrollTop = divChat.scrollHeight;
    }

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
          }
        });
      })
    }

    perfil(){
      this.router.navigate(['perfil']);
    }

    perfilProfe(idProfe: any){
      if (idProfe.includes('-N'))
        this.router.navigate([`profesor/${idProfe}`]);
    }

  }
