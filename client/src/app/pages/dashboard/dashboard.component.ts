import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  savedConversations = <any>[];
  constructor(private chatService: ChatService) {}
  ngOnInit(): void {
    this.chatService.getConversation().subscribe({
      next: (res) => {
        // console.log(JSON.parse(res.me));
        let actualData = JSON.parse(res.message);
        // console.log(actualData);

        this.savedConversations = actualData;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  handleConversation(conversation: any): void {
    console.log(conversation);
  }
}
