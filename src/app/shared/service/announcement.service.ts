import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Announcement} from '../model/announcement';
import {Observable} from 'rxjs';
import {AnnouncementDemo} from '../model/announcement.demo';

@Injectable()
export class AnnouncementService {

  private baseUrl = 'http://localhost:8080/licenta';

  constructor(private httpClient: HttpClient) {}

  getNext20Announcement(minPrice: number, maxPrice: number, nrRooms: number, isNew: boolean,
                        isOld: boolean, isSoldByOwner: boolean,
                        isSoldByAgent: boolean, page: number): Observable<Array<AnnouncementDemo>> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.baseUrl}/announcement/${minPrice}/${maxPrice}/${nrRooms}/${isNew}/${isOld}/${isSoldByOwner}/${isSoldByAgent}/${page}`;
    return this.httpClient.get<Array<AnnouncementDemo>>(url);
  }

  getNrFound(minPrice: number, maxPrice: number, nrRooms: number, isNew: boolean,
             isOld: boolean, isSoldByOwner: boolean,
             isSoldByAgent: boolean): Observable<number> {
    const url = `${this.baseUrl}/announcement/count/${minPrice}/${maxPrice}/${nrRooms}/${isNew}/${isOld}/${isSoldByOwner}/${isSoldByAgent}`;
    console.log('call:' + url);
    return this.httpClient.get<number>(url);
  }

  getAnnouncement(announcementId: number): Observable<Announcement> {
    const url = `${this.baseUrl}/announcement/${announcementId}`;
    return this.httpClient.get<Announcement>(url);
  }

}
