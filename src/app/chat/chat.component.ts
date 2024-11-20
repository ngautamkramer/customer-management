import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatButtonModule, FormsModule, DateAgoPipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  providers: [ApiService]
})

export class ChatComponent {

  messagesLists: any[] = [];

  newMessage: string = '';
  currentClientId: any = null;
  currentClientName: string = '';

  constructor(private socketService: SocketService, private apiService: ApiService) {}

  
  ngOnInit(): void {

    let currentUser =  this.apiService.getUserInfo();
    this.currentClientName = currentUser.name;

    this.socketService.on('connect').subscribe(() => {
      this.currentClientId = this.socketService['socket']['id'];
    });

    // Listen for incoming messages
    this.socketService.on('serverMessage').subscribe((message: string) => {
      console.log("---- message from server ----");
      this.messagesLists.push(message);
      console.log(this.messagesLists);
    });

  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      console.log("---- message sent server ----");
      let messageObj = {client_id: this.currentClientId, name: this.currentClientName, message: this.newMessage};
      this.socketService.emit('clientMessage', messageObj);
      this.newMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

}
