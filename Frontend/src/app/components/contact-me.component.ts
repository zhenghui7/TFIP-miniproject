import { Component } from '@angular/core';
import { URLSTRING, WBSTRING } from '../util/constant';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent {

  private ws!: WebSocket;

  username!: string;
  log: string[] = [];
  message!: string;

  connect() {
    const username = this.username;

    // Update the WebSocket URL with the correct username as a path parameter
    this.ws = new WebSocket(`ws://localhost:8080/chat/${username}`);

    this.ws.onopen = (event) => {
      console.log('WebSocket connection established');
    };

    this.ws.onmessage = (event) => {
      const log = document.getElementById("log") ?? document.createElement("textarea");
      console.log(event.data);
      const message = JSON.parse(event.data);
      log.innerHTML += message.from + " : " + message.content + "\n";
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket connection error:', error);
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket connection closed');
    };
  }

  send() {
    const content = this.message;
    const json = JSON.stringify({
      "content": content
    });

    this.ws.send(json);
  }
}