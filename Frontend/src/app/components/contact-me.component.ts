import { Component, ElementRef, ViewChild } from '@angular/core';
import { WBSTRING } from '../util/constant';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css'],
})
export class ContactMeComponent {
  private ws!: WebSocket;
  wsURL = WBSTRING;

  username!: string;
  log: string[] = [];
  message!: string;
  errorMessage: string = '';
  connected: boolean = false;

  @ViewChild('logArea') logArea!: ElementRef;

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

      this.ws.onmessage = this.handleIncomingMessage.bind(this);
    };

    this.ws.onmessage = (event) => {
      const log = document.getElementById('log') as HTMLTextAreaElement;
      console.log(event.data);
      const message = JSON.parse(event.data);
      log.innerHTML += message.from + ' : ' + message.content + '\n';
      this.scrollChatToBottom();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket connection error:', error);
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket connection closed');
      this.connected = false;
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
    const disconnectionMessage = 'You have disconnected from the group chat';
    this.log.push(disconnectionMessage); // Add the disconnection message to the log array
    this.scrollChatToBottom();
  }

  retrievePastMessages() {
    this.log = []; // Clear the log array
    this.logArea.nativeElement.value = ''; 

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
      this.errorMessage = !this.username ? 'Please enter a username and connect' : 'Please connect first' ;
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
    const message = JSON.parse(event.data);
    this.log.push(message.from + ' : ' + message.content); // Add the new message to the log array
    this.scrollChatToBottom();
  }

}
