import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comment} from '../model/comment';
import {Observable} from 'rxjs';

@Injectable()
export class CommentService {
  private baseUrl = 'http://localhost:8080/licenta';

  constructor(private httpClient: HttpClient) {}

  getAllCommentsForAnnouncement(announcementId: number): Observable<Array<Comment>> {
    const url = `${this.baseUrl}/comments/${announcementId}`;
    return this.httpClient.get<Array<Comment>>(url);
  }

  addCommentForAnnouncement(id: number, announcementId: number, title: string, description: string, date: Date): Observable<Comment> {
    const url = `${this.baseUrl}/comments`;
    const body = {announcementId, title, description, date};
    return this.httpClient.post<Comment>(url, body);
  }
}
