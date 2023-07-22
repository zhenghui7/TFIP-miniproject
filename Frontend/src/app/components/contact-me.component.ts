import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WBSTRING } from '../util/constant';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css'],
})
export class ContactMeComponent implements OnInit {
  private ws!: WebSocket;
  wsURL = WBSTRING;

  username!: string;
  log: { from: string, content: string }[] = [];
  message!: string;
  errorMessage: string = '';
  connected: boolean = false;
  connectedUsersArray: string[] = [];
  logContent: string = '';
  isRequestingConnectedUsers: boolean = false;
  
  @ViewChild('logArea') logArea!: ElementRef;

  ngOnInit() {
  }

  connect() {
    if (!this.username) {
      this.errorMessage = 'Username cannot be empty';
      return;
    }

    this.ws = new WebSocket('ws://' + this.wsURL + '/chat/' + this.username);

    this.ws.onopen = (event) => {
      this.errorMessage = '';
      this.connected = true;
      console.log('WebSocket connection established');
      this.updateConnectedUsers();
    };

    this.ws.onmessage = (event) => {
      this.handleIncomingMessage(event);
    };


    this.ws.onerror = (error) => {
      console.error('WebSocket connection error:', error);
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket connection closed');
      this.connected = false;
      this.updateConnectedUsers(); 
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
    const disconnectionMessage = {
      from: "*****************",
      content: 'You have disconnected from the group chat'
    };
    this.log.push(disconnectionMessage); 
    this.scrollChatToBottom();
    this.logContent = this.log.map(message => message.from + ' : ' + message.content).join('\n');
  }

  retrievePastMessages() {
    this.log = []; 

    if (!this.connected) {
      return;
    }

    const json = JSON.stringify({
      content: 'request_past_messages',
    });

    this.ws.send(json);
  }

  send() {
    if (!this.connected) {
      this.errorMessage = !this.username
        ? 'Please enter a username and connect'
        : 'Please connect first';
      return;
    }

    const content = this.message;
    const json = JSON.stringify({
      content: content,
    });

    this.ws.send(json);
    this.message = '';
    this.errorMessage = '';
  }

  private scrollChatToBottom() {
    setTimeout(() => {
      const logArea = this.logArea.nativeElement;
      logArea.scrollTop = logArea.scrollHeight;
    });
  }

  private handleIncomingMessage(event: MessageEvent) {
    const log = document.getElementById('log') as HTMLTextAreaElement;
    // console.log(">>>>>>>>>>>>>> event.data: " + event.data);

    const message = JSON.parse(event.data);
    if (message.content === 'connected_users_list') {
      // this.connectedUsers.next(message.users);
      this.connectedUsersArray = message.users;
      // console.log(">>>>>>>>>>>> in connected_users_list: " + message.users)

      if (!this.isRequestingConnectedUsers) {
        this.isRequestingConnectedUsers = true;
        setTimeout(() => {
          this.updateConnectedUsers();
        }, 1000);
      }
      
    } else {
      this.log.push({ from: message.from, content: message.content }); 
      this.scrollChatToBottom();
      this.logContent = this.log.map(message => message.from + ' : ' + message.content).join('\n');
    }
  }

  private updateConnectedUsers() {
    if (this.connected) {
      this.ws.send(JSON.stringify({ content: 'request_connected_users' }));
    } else {
      this.connectedUsersArray = [];
    }
    this.isRequestingConnectedUsers = false;
  }
  
}
