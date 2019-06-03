import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Announcement} from '../model/announcement';
import {Observable} from 'rxjs';
import {AnnouncementDemo} from '../model/announcement.demo';
import {ConstructionYear} from '../model/enum/contruction.year';
import {Distributor} from '../model/enum/distributor';

@Injectable()
export class AnnouncementService {

  private baseUrl = 'http://localhost:8080/licenta';

  constructor(private httpClient: HttpClient) {}

  getNext20Announcement(minPrice: number, maxPrice: number, nrRooms: number, constructionYear: ConstructionYear,
                        distributor: Distributor, page: number, sortBy: boolean): Observable<Array<AnnouncementDemo>> {
    // tslint:disable-next-line:max-line-length
    const url = `${this.baseUrl}/announcement/${minPrice}/${maxPrice}/${nrRooms}/${constructionYear}/${distributor}/${page}/${sortBy}`;
    return this.httpClient.get<Array<AnnouncementDemo>>(url);
  }

  getNrFound(minPrice: number, maxPrice: number, nrRooms: number, constructionYear: ConstructionYear,
             distributor: Distributor): Observable<number> {
    const url = `${this.baseUrl}/announcement/count/${minPrice}/${maxPrice}/${nrRooms}/${constructionYear}/${distributor}`;
    console.log('call:' + url);
    return this.httpClient.get<number>(url);
  }

  getAnnouncement(announcementId: number): Observable<Announcement> {
    const url = `${this.baseUrl}/announcement/${announcementId}`;
    return this.httpClient.get<Announcement>(url);
  }

}
