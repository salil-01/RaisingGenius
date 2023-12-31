import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { message } from 'src/app/models/constants';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnChanges, OnDestroy {
  resLoading: boolean = false;
  conversationLoading: boolean = false;
  @Input() chatData: any;
  messages: message[] = [{ from: 'openai', response: 'Hello' }];
  userMessage: string = '';
  constructor(private chatService: ChatService, private toast: ToastrService) {}

  // checks on data change and will feed previous chats if clicked
  ngOnChanges(changes: SimpleChanges) {
    // check for changes
    if (changes['chatData']) {
      // updating data
      if (this.chatData) {
        this.messages = this.chatData?.chats;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.messages.length > 1) {
      if (this.chatData === undefined) {
        const data = { name: 'Chat', chats: [...this.messages] };
        this.chatService.postConversation(data).subscribe({
          next: (res) => {
            console.log(res);
            this.toast.success('<p>Chat Saved Successfully</p>', '', {
              enableHtml: true,
              closeButton: true,
            });
          },
          error: (error) => {
            console.log(error);
            this.toast.error('<p>Server Error</p>', '', {
              enableHtml: true,
              closeButton: true,
            });
          },
        });
      } else {
        // console.log('in msg chat defined');
        if (this.chatData._id) {
          const data = {
            name: 'Chat',
            _id: this.chatData._id,
            user_id: this.chatData.user_id,
            chats: [...this.messages],
          };
          this.chatService.updateConversation(data).subscribe({
            next: (res) => {
              console.log(res);
              this.toast.success('<p>Chat Saved Successfully</p>', '', {
                enableHtml: true,
                closeButton: true,
              });
            },
            error: (error) => {
              console.log(error);
              this.toast.error('<p>Server Error</p>', '', {
                enableHtml: true,
                closeButton: true,
              });
            },
          });
        } else {
          const data = { name: 'Chat', chats: [...this.messages] };
          this.chatService.postConversation(data).subscribe({
            next: (res) => {
              console.log(res);
              this.toast.success('<p>Chat Saved Successfully</p>', '', {
                enableHtml: true,
                closeButton: true,
              });
            },
            error: (error) => {
              console.log(error);
              this.toast.error('<p>Server Error</p>', '', {
                enableHtml: true,
                closeButton: true,
              });
            },
          });
        }
      }
    }
  }
  sendMessage() {
    if (this.userMessage.trim()) {
      // console.log(this.userMessage);
      this.resLoading = true;
      this.messages.push({ from: 'user', response: this.userMessage });
      this.chatService.postMessage(this.userMessage).subscribe({
        next: (res) => {
          // console.log(res);
          this.messages.push({ from: 'openai', response: res.response });
          this.resLoading = false;
          this.userMessage = '';
        },
        error: (error) => {
          console.log(error);
          this.resLoading = false;
          this.toast.error('<p>Server Error</p>', '', {
            enableHtml: true,
            closeButton: true,
          });
        },
      });
      // console.log(this.userMessage);
      this.userMessage = ''; // Clear the input box
    }
  }
}
