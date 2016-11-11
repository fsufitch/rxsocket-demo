import { Component } from '@angular/core';

import { EchoService } from './echo.service';

@Component({
  selector: 'demo-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
})
export class AppComponent {
  latestMessage$ = this.echoService.getMessageStream();
  messages$ = this.echoService.getMessagesAggregate();

  message = '';

  constructor(
    private echoService: EchoService
  ) {}

  send() {
    this.echoService.sendMessage(this.message);
  }
}
