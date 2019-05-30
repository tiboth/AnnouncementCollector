import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comment} from '../model/comment';
import {Observable} from 'rxjs';

@Injectable()
export class CommentService {
  private baseUrl = 'http://localhost:8080/licenta/announcement';

  constructor(private httpClient: HttpClient) {}

  getAllCommentsForAnnouncement(announcementId: number): Observable<Array<Comment>> {
    const url = `${this.baseUrl}/${announcementId}/comment`;
    return this.httpClient.get<Array<Comment>>(url);
  }

  addCommentForAnnouncement(announcementId: number, commentTitle: string, comment: string): Observable<Comment> {
    const url = `${this.baseUrl}/${announcementId}/comment`;
    const body = {announcementId, commentTitle, comment};
    return this.httpClient.post<Comment>(url, body);
  }
}
