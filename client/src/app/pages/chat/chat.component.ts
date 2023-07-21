import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  loading: boolean = false;
  messages: any[] = [
    { from: 'openai', content: 'Hello, how can I help you today?' },
  ];

  userMessage: string = '';

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ from: 'user', content: this.userMessage });
      console.log(this.userMessage);

      this.userMessage = ''; // Clear the input box
    }
  }
}
