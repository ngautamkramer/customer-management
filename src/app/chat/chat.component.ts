import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatButtonModule, FormsModule, DateAgoPipe, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  providers: [ApiService]
})

export class ChatComponent {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  messagesLists: any[] = [];
  newMessage: string = '';
  currentClientId: any = null;
  currentClientName: string = '';
  currentUser =  this.apiService.getUserInfo();
  typingTimeout: any = null;
  typingIndicator: string = '';

  constructor(private socketService: SocketService, private apiService: ApiService) {}

  
  ngOnInit(): void {
    this.initializeSocketFunctions();
  }


  initializeSocketFunctions(){
    this.currentClientName = this.currentUser.name;

    this.socketService.on('connect').subscribe(() => {
      this.currentClientId = this.socketService['socket']['id'];
    });

    // Listen for incoming messages
    this.socketService.on('serverMessage').subscribe((message: string) => {
      console.log("---- message from server ----");
      this.messagesLists.push(message);

      let cntCar = this.scrollContainer;
      setTimeout(function(){
        cntCar.nativeElement.scroll({
          top: cntCar.nativeElement.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      });

    });

    
    // Listen for typing events from others
    this.socketService.on('startTyping').subscribe((message: string) => {
      this.typingIndicator = `${message} is typing...`;
    });

    this.socketService.on('stopTyping').subscribe((message: string) => {
      this.typingIndicator = '';
    });

  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      console.log("---- message sent server ----");
      let messageObj = {client_id: this.currentClientId, name: this.currentClientName, message: this.newMessage};
      this.socketService.emit('clientMessage', messageObj);
      this.newMessage = '';
      this.socketService.emit('stopTyping', this.currentUser.name);
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  getImageFromName(name: string){
    return this.apiService.getFirstCharFromString(name);
  }

  typingMessageInput(){
    if(this.newMessage.trim()){
      this.socketService.emit('startTyping', this.currentUser.name);
    }else{
      this.socketService.emit('stopTyping', this.currentUser.name);
    }
  }

  typingMessageKeyup(){
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
        this.socketService.emit('stopTyping', this.currentUser.name);
    }, 3000);
  }

}
