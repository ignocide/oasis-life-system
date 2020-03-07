import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MusicService } from './music/music.service';
import { clearInterval } from 'timers';
import { Inject, forwardRef } from '@nestjs/common';

@WebSocketGateway({ namespace: 'musics' })
export class MusicGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private clientCount = 0;
  private interval?: NodeJS.Timeout = null;

  constructor(
    @Inject(forwardRef(() => MusicService))
    private readonly musicsService: MusicService,
  ) {}

  handleDisconnect(client: any) {
    this.clientCount--;

    if (this.clientCount === 0) {
      clearInterval(this.interval);
    }
  }
  handleConnection(client: any, ...args: any[]) {
    this.clientCount++;
    if (this.interval === null) {
      this.interval = setInterval(() => {
        this.updateCurrentMusicState();
      }, 500);
    }
  }

  afterInit(server: Server) {
    this.musicsService.play();
  }

  updateCurrentMusicState() {
    const { getCurrentAudio, isPlaying } = this.musicsService;
    if (isPlaying) {
      console.log('send');
    }
  }

  @SubscribeMessage('client-to-server')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('server-to-client', 'pong');
  }
}
