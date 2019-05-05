import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Announcement} from '../model/announcement';

@Injectable()
export class AnnouncementService {

  private baseUrl = 'http://localhost:8080/licenta';

  constructor(private httpClient: HttpClient) {}

  filterAnnouncement(minPrice: number, maxPrice: number, nrRooms: number, isNew: boolean, isOld: boolean,
                     isDetached: boolean, isSemiDetached: boolean, isSoldByOwner: boolean, isSoldByAgent: boolean) {
    // tslint:disable-next-line:max-line-length
    const url = `${this.baseUrl}/announcement/${maxPrice}/${minPrice}/${nrRooms}/${isNew}/${isOld}/${isDetached}/${isSemiDetached}/${isSoldByOwner}/${isSoldByAgent}`;
    return this.httpClient.get<Array<Announcement>>(url);
  }

  findAnnouncement(id: number) {
    const url = `${this.baseUrl}/announcement/${id}`;
    return this.httpClient.get<Array<Announcement>>(url);
  }
}
