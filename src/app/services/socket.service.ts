import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Replace with your backend URL
    this.socket = io('https://172.30.92.36/');
  }

  // Emit an event
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Listen for events
  on(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });

      // Cleanup on unsubscribe
      return () => this.socket.off(eventName);
    });
  }

  // Disconnect socket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
