import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { message } from 'src/app/models/constants';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnDestroy {
  loading: boolean = false;
  messages: message[] = [{ from: 'openai', response: 'Hello' }];
  userMessage: string = '';
  constructor(private chatService: ChatService, private toast: ToastrService) {}

  ngOnDestroy(): void {
    if (this.messages.length > 1) {
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
  sendMessage() {
    if (this.userMessage.trim()) {
      console.log(this.userMessage);

      this.messages.push({ from: 'user', response: this.userMessage });
      this.chatService.postMessage(this.userMessage).subscribe({
        next: (res) => {
          // console.log(res);
          this.messages.push({ from: 'openai', response: res.response });
          this.userMessage = '';
        },
        error: (error) => {
          console.log(error);
          this.toast.error('<p>Server Error</p>', '', {
            enableHtml: true,
            closeButton: true,
          });
        },
      });
      console.log(this.userMessage);

      this.userMessage = ''; // Clear the input box
    }
  }
}
