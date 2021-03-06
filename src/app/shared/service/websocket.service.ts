import {Injectable} from "@angular/core";

declare var require: any;
var SockJs = require('sockjs-client');
var Stomp = require('stompjs');

@Injectable()
export class WebSocketService {
  constructor() {
  }

  connect() {
    let socket = new SockJs(`http://localhost:8080/socket`);

    let stompClient = Stomp.over(socket);
    console.log(stompClient);
    return stompClient;
  }
}
