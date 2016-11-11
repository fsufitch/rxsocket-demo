import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RxWebSocket } from 'rxsocket';

let remoteURL = require('./remote-config.yaml').url;

interface Payload {
  message: string;
  date: Date;
}

@Injectable()
export class EchoService {
  private _connection: RxWebSocket<Payload>;

  private _serializePayload(payload: Payload): string {
    return JSON.stringify({
      message: payload.message,
      date: payload.date.valueOf(),
    });
  }

  private _deserializePayload(data: string): Payload {
    let parsed = JSON.parse(data);
    return {
      message: <string>parsed.message,
      date: new Date(parsed.date),
    };
  }

  private get lazyConnection() {
    if (!this._connection) {
      this._connection = new RxWebSocket<Payload>(remoteURL);
      this._connection.deserialize = this._deserializePayload;
      this._connection.serialize = this._serializePayload;
    }
    return this._connection;
  }

  getMessageStream() {
    return this.lazyConnection.incoming;
  }

  getMessagesAggregate() {
    return this.getMessageStream().scan((acc, value) => acc.concat(value), new Array<Payload>());
  }

  sendMessage(message: string) {
    let payload: Payload = {message, date: new Date()};
    this.lazyConnection.outgoing.next(payload);
  }
}
