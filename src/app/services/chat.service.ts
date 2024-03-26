import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase) {}

  sendMessage(message: string, userId: string, recipientId: string): void {
    const conversationId = this.generateConversationId(userId, recipientId);
    this.db.list(`/conversations/${conversationId}`).push({
      message: message,
      participants: {
        'userId': userId,
        'recipientId': recipientId
      },
      /* userId: userId, */
      timestamp: Date.now(),
    });
  }

  getConversation(userId: string, recipientId: string): Observable<any> {
    const conversationId = this.generateConversationId(userId, recipientId);
    const conversationRef = this.db.list(`/conversations/${conversationId}`).valueChanges();
    return conversationRef;
  }

  searchWordInList(path: string): Observable<any> {
    // Retrieve the list from the database
    return this.db.object(path).valueChanges()
  }

  private generateConversationId(userId: string, recipientId: string): string {
    // Generate a unique conversation ID based on user IDs
    return userId < recipientId ? `${userId}_${recipientId}` : `${recipientId}_${userId}`;
  }


}