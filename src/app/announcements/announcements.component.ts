import {Component, ElementRef, EventEmitter, OnInit} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';
import {UtilService} from '../shared/service/util.service';
import { trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import {AnnouncementService} from '../shared/service/announcement.service';
import {Announcement} from '../shared/model/announcement';
import {AnnouncementDemo} from '../shared/model/announcement.demo';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({opacity: 0 }), {optional: true}),
        // query(':enter', stagger('300ms', [
        //   animate('1s ease-in', keyframes([
        //     style({opacity: 0, transform: 'translateY(-75px)', offset: 0}),
        //     style({opacity: 0.5, transform: 'translateY(35px)', offset: 0.3}),
        //     style({opacity: 1, transform: 'translateY(0px)', offset: 1})
        //   ]))
        // ]), {optional: true}),
        query(':leave', stagger('0ms', [
          animate('0.5s ease-out', keyframes([
            style({opacity: 1, transform: 'translateX(0px)', offset: 0}),
            style({opacity: 0.5, transform: 'translateX(25px)', offset: 0.3}),
            style({opacity: 0, transform: 'translateX(125px)', offset: 1})
          ]))
        ]), {optional: true}),
      ])
    ])
  ]
})
export class AnnouncementsComponent implements OnInit {
  sliderRefresh: EventEmitter<void> = new EventEmitter<void>();
  announcements = [];
  nrAnnouncements: number;
  announcementsFromCore: Array<AnnouncementDemo>;
  page = 1;
  minPrice = +localStorage.getItem('minPrice');
  maxPrice = +localStorage.getItem('maxPrice');
  priceOptions: Options = {
    floor: 75,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  nrRooms = +localStorage.getItem('nrRooms');
  roomOptions: Options = {
    floor: 1,
    ceil: 4,
    showTicks: true,
  };

  optionList = [];
  optionSettings = {};
  selectedOptions = [];

  likedList = [];
  deletedList = [];

  isNew = false;
  isOld = false;
  isDetached = false;
  isSemiDetached = false;
  isOwner = false;
  isAgent = false;

  constructor(private utilService: UtilService, private announcementService: AnnouncementService) {  }

  ngOnInit() {
    this.optionList = [
      { id: 1, itemName: 'New buildings(>2000)' },
      { id: 2, itemName: 'Old buildings(<2000)' },
      { id: 3, itemName: 'Detached' },
      { id: 4, itemName: 'Semi detached' },
      { id: 5, itemName: 'Sell by owner' },
      { id: 6, itemName: 'Sell by real estate agent' }
    ];

    if (localStorage.getItem('newBuilding') === '1') {
      this.selectedOptions.push({id: 1, itemName: 'New buildings(>2000)'});
      this.isNew  = true;
    }
    if (localStorage.getItem('oldBuilding') === '1') {
      this.selectedOptions.push({id: 2, itemName: 'Old buildings(<2000)'});
      this.isOld = true;
    }
    if (localStorage.getItem('detached') === '1') {
      this.selectedOptions.push({id: 3, itemName: 'Detached'});
      this.isDetached = true;
    }
    if (localStorage.getItem('semiDetached') === '1') {
      this.selectedOptions.push({id: 4, itemName: 'Semi detached'});
      this.isSemiDetached = true;
    }
    if (localStorage.getItem('owner') === '1') {
      this.selectedOptions.push({id: 5, itemName: 'Sell by owner'});
      this.isOwner = true;
    }
    if (localStorage.getItem('agent') === '1') {
      this.selectedOptions.push({ id: 6, itemName: 'Sell by real estate agent' });
      this.isAgent = true;
    }

    this.optionSettings = {
      text: 'Select options',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };

    this.likedList = JSON.parse(localStorage.getItem('likedList'));
    this.deletedList = JSON.parse(localStorage.getItem('deletedList'));

    // service call
    this.announcementService.getNrFound(this.minPrice, this.maxPrice, this.nrRooms, this.isNew, this.isOld,
      this.isOwner, this.isAgent)
      .subscribe(result => this.nrAnnouncements = result,
        error => console.log(JSON.stringify(error)),
        () => console.log('Nr received from core: ' + this.nrAnnouncements));

    this.announcementService.getNext20Announcement(this.minPrice, this.maxPrice, this.nrRooms, this.isNew, this.isOld,
       this.isOwner, this.isAgent, 0)
      .subscribe(result => this.announcementsFromCore = result,
                  error => console.log(JSON.stringify(error)),
                  () => this.announcementsFromCore.forEach(announcement => {
                                    if (this.deletedList.indexOf(announcement.id) === -1) {
                                      if (this.likedList.indexOf(announcement.id) === -1) {
                                        // tslint:disable-next-line:max-line-length
                                        this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, like: false});
                                      } else {
                                        // tslint:disable-next-line:max-line-length
                                        this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, like: true});
                                    }}}));
  }

  onUpdatePreferencesClick() {
    this.announcementService.getNrFound(this.minPrice, this.maxPrice, this.nrRooms, this.isNew, this.isOld,
      this.isOwner, this.isAgent)
      .subscribe(result => this.nrAnnouncements = result,
        error => console.log(JSON.stringify(error)),
        () => console.log('Nr received from core: ' + this.nrAnnouncements));

    this.announcements = [];
    this.announcementService.getNext20Announcement(this.minPrice, this.maxPrice, this.nrRooms, this.isNew, this.isOld,
      this.isOwner, this.isAgent, 0)
      .subscribe(result => this.announcementsFromCore = result,
        error => console.log(JSON.stringify(error)),
        () => this.announcementsFromCore.forEach(announcement => {
          if (this.deletedList.indexOf(announcement.id) === -1) {
            if (this.likedList.indexOf(announcement.id) === -1) {
              // tslint:disable-next-line:max-line-length
              this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, like: false});
            } else {
              this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, like: true});
            }}}));
    this.utilService.createToastrSuccsess('', 'Your preferences are updated.');
    this.findAnnouncements();
  }

  findAnnouncements() {
    console.log('Min price:' + this.minPrice);
    console.log('Max price:' + this.maxPrice);
    console.log('Nr rooms:' + this.nrRooms);

    this.selectedOptions.forEach(option => console.log(option.itemName));

    localStorage.setItem('arePreferencesSet', '1');
    localStorage.setItem('minPrice', this.minPrice.toString());
    localStorage.setItem('maxPrice', this.maxPrice.toString());
    localStorage.setItem('nrRooms', this.nrRooms.toString());

    localStorage.setItem('newBuilding', '0');
    localStorage.setItem('oldBuilding', '0');
    localStorage.setItem('detached', '0');
    localStorage.setItem('semiDetached', '0');
    localStorage.setItem('owner', '0');
    localStorage.setItem('agent', '0');

    this.isNew = false;
    this.isOld = false;
    this.isDetached = false;
    this.isSemiDetached = false;
    this.isOwner = false;
    this.isAgent = false;

    localStorage.setItem('likedList', JSON.stringify([]));
    localStorage.setItem('deletedList', JSON.stringify([]));

    this.selectedOptions.forEach(option => {
      switch (option.itemName) {
        case ('New buildings(>2000)'):
          localStorage.setItem('newBuilding', '1');
          this.isNew = true;
          break;
        case 'Old buildings(<2000)':
          localStorage.setItem('oldBuilding', '1');
          this.isOld = true;
          break;
        case 'Detached':
          localStorage.setItem('detached', '1');
          this.isDetached = true;
          break;
        case 'Semi detached':
          localStorage.setItem('semiDetached', '1');
          this.isSemiDetached = true;
          break;
        case 'Sell by owner':
          localStorage.setItem('owner', '1');
          this.isOwner = true;
          break;
        case 'Sell by real estate agent':
          localStorage.setItem('agent', '1');
          this.isAgent = true;
          break;
      }
    });

    this.likedList = JSON.parse(localStorage.getItem('likedList'));
    this.deletedList = JSON.parse(localStorage.getItem('deletedList'));
    this.announcements = [];
    this.page = 0;

    // call service
    this.announcementService.getNext20Announcement(this.minPrice, this.maxPrice, this.nrRooms, this.isNew,
      this.isOld, this.isOwner, this.isAgent, 0)
      .subscribe(result => this.announcementsFromCore = result,
        error => console.log(JSON.stringify(error)),
        () => this.announcementsFromCore.forEach(announcement => {
          if (this.deletedList.indexOf(announcement.id) === -1) {
            if (this.likedList.indexOf(announcement.id) === -1) {
              // tslint:disable-next-line:max-line-length
              this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, like: false});
            } else {
              this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, like: true});
            }}}));
    this.page = 1;
  }

  onOptionSelect() {
  }

  OnOptionDeSelect() {
  }

  onSelectAllOptions() {

  }

  onDeSelectAllOptions() {
  }

  onMyPreferencesClick(): void {
    this.sliderRefresh.emit();

    this.minPrice = +localStorage.getItem('minPrice');
    this.maxPrice = +localStorage.getItem('maxPrice');

    this.nrRooms = +localStorage.getItem('nrRooms');

    this.selectedOptions = [];
    if (localStorage.getItem('newBuilding') === '1') {
      this.selectedOptions.push({id: 1, itemName: 'New buildings(>2000)'});
    }
    if (localStorage.getItem('oldBuilding') === '1') {
      this.selectedOptions.push({id: 2, itemName: 'Old buildings(<2000)'});
    }
    if (localStorage.getItem('detached') === '1') {
      this.selectedOptions.push({id: 3, itemName: 'Detached'});
    }
    if (localStorage.getItem('semiDetached') === '1') {
      this.selectedOptions.push({id: 4, itemName: 'Semi detached'});
    }
    if (localStorage.getItem('owner') === '1') {
      this.selectedOptions.push({id: 5, itemName: 'Sell by owner'});
    }
    if (localStorage.getItem('agent') === '1') {
      this.selectedOptions.push({ id: 6, itemName: 'Sell by real estate agent' });
    }
  }

  likeAnnouncement(id: number) {
    this.likedList.push(id);
    localStorage.setItem('likedList', JSON.stringify(this.likedList));

    this.announcements.filter(elem => elem.id === id).forEach(elem => elem.like = !elem.like);
  }

  deleteAnnouncement(id: number) {
    this.deletedList.push(id);
    localStorage.setItem('deletedList', JSON.stringify(this.deletedList));

    const index: number = this.announcements.findIndex(elem => elem.id === id);
    this.announcements.splice(index, 1);

    this.utilService.createToastrError('', 'Announcement deleted successfully');
  }

  trackByFn(index: number, announcement: any): number {
    return announcement.id;
  }

  onPageChange(page: number) {
    this.page = page;
    window.scrollTo(0, 0);

    this.announcements = [];
    // service call
    // call service
    this.announcementService.getNext20Announcement(this.minPrice, this.maxPrice, this.nrRooms, this.isNew,
      this.isOld, this.isOwner, this.isAgent, this.page - 1)
      .subscribe(result => this.announcementsFromCore = result,
        error => console.log(JSON.stringify(error)),
        () => this.announcementsFromCore.forEach(announcement => {
          if (this.deletedList.indexOf(announcement.id) === -1) {
            if (this.likedList.indexOf(announcement.id) === -1) {
              // tslint:disable-next-line:max-line-length
              this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, like: false});
            } else {
              this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, like: true});
            }}}));
  }

}
