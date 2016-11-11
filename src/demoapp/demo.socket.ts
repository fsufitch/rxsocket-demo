import { RxWebSocket } from 'rxsocket';

export interface DemoPayload {
  message: string;
  date: Date;
}

export class DemoSocket extends RxWebSocket<DemoPayload> {
  serialize = (data: DemoPayload) => JSON.stringify({
    message: data.message,
    date: data.date.valueOf(),
  });

  deserialize = (data: string) => {
    let parsed = JSON.parse(data);
    return {
      message: <string>parsed.message,
      date: new Date(parsed.date),
    };
  }
}
