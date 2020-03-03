import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: 'musics' })
export class MusicsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  handleDisconnect(client: any) {
    console.log('client is disconnected');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('client is connected');
  }
  afterInit(server: any) {
    console.log('gateway is init');
  }
  @WebSocketServer() server: Server;

  @SubscribeMessage('ping')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }
}
