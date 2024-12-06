import { Inject, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket | undefined; // Avoid possible re-initialization
  private readonly SERVER_URL = environment.api_url; // Backend URL
  private connectionStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private socketId: string | undefined;

  constructor(private ngZone: NgZone) {
      this.initialize();
  }

  initialize() {

    this.ngZone.runOutsideAngular(() => {

        this.socket = io(this.SERVER_URL);

        this.socket.on('disconnect', (reason) => {
          console.warn('Socket disconnected:', reason);
          this.connectionStatus.next(false); // Notify connection lost
        });

        this.socket.on('connect', () => {
          this.socketId = this.socket?.id; // Store the socket ID
          console.log('Socket connected:', this.socket?.id);
          this.connectionStatus.next(true); // Notify connection is ready
        });
  

        this.socket.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
        });
      
    });
    
  }

    // Getter for the socket ID
    getSocketId(): string | undefined {
      return this.socketId;
    }
  

  // Wait for connection to be ready before emitting or listening
  isConnected(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

  emit(event: string, data: any): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket is not connected. Cannot emit:', event);
    }
  }

  on<T>(event: string): Observable<T> {
    const subject = new Subject<T>();
    this.isConnected().subscribe((connected) => {
      if (connected) {
        this.socket?.on(event, (data: T) => {
          subject.next(data);
        });
      }
    });
    return subject.asObservable();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }


}
