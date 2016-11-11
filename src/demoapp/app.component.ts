import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { EchoService } from './echo.service';

@Component({
  selector: 'demo-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
})
export class AppComponent {
  latestMessage$ = new BehaviorSubject<string>(null);
  payloads$ = this.echoService.getMessagesAggregate();

  constructor(
    private echoService: EchoService
  ) {
    this.echoService.getMessageStream()
      .map(payload => payload.message)
      .subscribe(this.latestMessage$);
  }

  send(message: string) {
    this.echoService.sendMessage(message);
  }
}
