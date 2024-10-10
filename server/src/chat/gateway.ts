import { WebSocketGateway, SubscribeMessage, WebSocketServer} from '@nestjs/websockets';
import { Socket,Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(3003,{
    cors: {
      origin: '*', // Cho phép tất cả nguồn gốc
      methods: ['GET', 'POST'],
      allowedHeaders: ['*'],
      credentials: true,
    },
  })
export class ChatGateway {
  @WebSocketServer() server: Server; 
  constructor(private ChatService: ChatService){}
  @SubscribeMessage('newMessage')
  async createNewMessage(client:Socket,payload:{sender:string,receiver:string,message:string}){
    const updatedChat = await this.ChatService.createMessage(payload.sender,payload.receiver,payload.message)
    this.server.emit('newMessage',updatedChat)
  }
  @SubscribeMessage('getMessages')   
  async getMessage(client:Socket,payload:{sender:string,receiver:string}){
    const messages = await this.ChatService.getMessage(payload.sender,payload.receiver)
    this.server.emit('getMessages',messages) 
  }
  @SubscribeMessage('getOnlineUsers')
  async getOnlineUsers(client:Socket){ 
    // const users = await this.ChatService.getOnlineUsers()
    // this.server.emit('getOnlineUsers',users)
  }
  @SubscribeMessage('deleteMessages')
  async deleteMessages(client:Socket,payload:{sender:string,receiver:string}){
    await this.ChatService.deleteMessages(payload.sender,payload.receiver)
    this.server.emit('deleteMessages')
  }
}
