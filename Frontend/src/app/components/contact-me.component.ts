import { Component } from '@angular/core';
import { URLSTRING, WBSTRING } from '../util/constant';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent {

  ws!: WebSocket;
  serverUrl = WBSTRING; 

  username!: string;
  log: string[] = [];
  message!: string;

  connect() {
    const username = this.username;

    const host = document.location.host;
    const pathname = document.location.pathname;

    console.log(">>>> host: " + host)
    console.log(">>>> pathname: " + pathname)

    this.ws = new WebSocket("ws://" + this.serverUrl  + pathname + "chat/" + username);
    console.log(this.ws)

    this.ws.onmessage = (event) => {
      const log = document.getElementById("log") ?? document.createElement("textarea");
      console.log(event.data);
      const message = JSON.parse(event.data);
      log.innerHTML += message.from + " : " + message.content + "\n";
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
