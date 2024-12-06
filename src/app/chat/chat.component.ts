import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatButtonModule, FormsModule, DateAgoPipe, CommonModule, PickerModule],
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

  showEmojiPicker = false;
  apiPath: string = environment.api_url;
  private subscriptions: Subscription = new Subscription();
  sendBtnStatus: boolean = false;

  constructor(private socketService: SocketService, private apiService: ApiService, private sanitizer: DomSanitizer) {}

  
  initializeSocketFunctions(){

    this.currentClientName = this.currentUser.name;

    // Listen for incoming messages
    const messageSub1 = this.socketService.on<any>('serverMessage').subscribe((message: any) => {
      console.log("---- message from server ----");
      this.messagesLists.push(message);
      console.log(this.messagesLists);

      let cntCar = this.scrollContainer;
      setTimeout(function(){
        cntCar.nativeElement.scroll({
          top: cntCar.nativeElement.scrollHeight,
          left: 0,
          behavior: 'smooth'
        });
      });
    });
    this.subscriptions.add(messageSub1);


    const messageSub2 =  this.socketService.on<string>('startTyping').subscribe((message: string) => {
      this.typingIndicator = `${message} is typing...`;
    });
    this.subscriptions.add(messageSub2);


    const messageSub3 =  this.socketService.on<string>('stopTyping').subscribe((message: string) => {
      this.typingIndicator = '';
    });
    this.subscriptions.add(messageSub3);

  }


  sendMessage(): void {
    if (this.newMessage.trim()) {
      console.log("---- message sent server ----");
      let messageObj = {client_id: this.currentClientId, name: this.currentClientName, message: this.newMessage, files: ''};
      this.socketService.emit('clientMessage', messageObj);
      this.newMessage = '';
      this.socketService.emit('stopTyping', this.currentUser.name);
    }
  }

  
  ngOnInit(): void {
    this.socketService.isConnected().subscribe((connected) => {
      if (connected) {
        this.currentClientId = this.socketService.getSocketId();
        this.initializeSocketFunctions();
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
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


  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }


  addEmoji(event: any) {
    console.log(event);
    this.newMessage += event.emoji.native; // Append the selected emoji to the message
  }


  uploadFile(event: any){
    let selectedFile = event.target.files[0];

    if(!selectedFile){
      alert("Please select a file before uploading."); return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    this.sendBtnStatus = true;
    this.apiService.sendUploadFileRequest(formData).subscribe({
      next: (response) => {
        //send image chat 
        let messageObj = {client_id: this.currentClientId, name: this.currentClientName, message: this.newMessage, files: response.body.file};
        this.socketService.emit('clientMessage', messageObj); 
        //alert("File uploaded successfully");
        this.sendBtnStatus = false;
      },
      error: (error) => {
        console.error('Error during POST:', error.message);
        this.sendBtnStatus = false;
      }
    });

  }

  render_message(string: string){
    return this.sanitizer.bypassSecurityTrustHtml(this.apiService.transform(string) );

  }


}
