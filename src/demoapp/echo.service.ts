import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


import { DemoSocket } from './demo.socket';
let remoteURL = require('./remote-config.yaml').url;

interface Payload {
  message: string;
  date: Date;
}

@Injectable()
export class EchoService {
  private _socket: DemoSocket;

  private get lazySocket() {
    if (!this._socket) {
      this._socket = new DemoSocket(remoteURL);
    }
    return this._socket;
  }

  getMessageStream() {
    return this.lazySocket.incoming.share();
  }

  getMessagesAggregate() {
    return this.getMessageStream().scan((acc, value) => acc.concat(value), new Array<Payload>());
  }

  sendMessage(message: string) {
    let payload: Payload = {message, date: new Date()};
    this.lazySocket.outgoing.next(payload);
  }
}
