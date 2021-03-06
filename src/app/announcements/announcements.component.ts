import {Component, EventEmitter, OnInit} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';
import {UtilService} from '../shared/service/util.service';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';
import {AnnouncementService} from '../shared/service/announcement.service';
import {AnnouncementDemo} from '../shared/model/announcement.demo';
import {ConstructionYear} from '../shared/model/enum/contruction.year';
import {Distributor} from '../shared/model/enum/distributor';

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

  // construction year
  optionList1 = [];
  optionSettings1 = {};
  selectedOptions1 = [];

  // distributor
  optionList3 = [];
  optionSettings3 = {};
  selectedOptions3 = [];

  optionList2 = [];
  optionSettings2 = {};
  selectedOptions2 = [];

  likedList = [];
  deletedList = [];

  constructionYear = ConstructionYear.EMPTY;
  distributor = Distributor.EMPTY;

  sortBy = false;

  constructor(private utilService: UtilService, private announcementService: AnnouncementService) {  }

  ngOnInit() {
    this.optionList1 = [
      { id: 1, itemName: 'New buildings(>2000)' },
      { id: 2, itemName: 'Old buildings(<2000)' },
    ];

    this.optionList3 = [
      { id: 3, itemName: 'Sell by owner' },
      { id: 4, itemName: 'Sell by real estate agent' }
    ];

    if (localStorage.getItem('newBuilding') === '1') {
      this.selectedOptions1.push({id: 1, itemName: 'New buildings(>2000)'});
      this.constructionYear = ConstructionYear.AFTER;
    }
    if (localStorage.getItem('oldBuilding') === '1') {
      this.selectedOptions1.push({id: 2, itemName: 'Old buildings(<2000)'});
      this.constructionYear = ConstructionYear.BEFORE;
    }
    if (localStorage.getItem('owner') === '1') {
      this.selectedOptions3.push({id: 3, itemName: 'Sell by owner'});
      this.distributor = Distributor.PROPRIETAR;
    }
    if (localStorage.getItem('agent') === '1') {
      this.selectedOptions3.push({ id: 4, itemName: 'Sell by real estate agent' });
      this.distributor = Distributor.AGENTIE;
    }

    this.optionSettings1 = {
      text: 'Select construction year',
      limitSelection: 1
    };

    this.optionSettings3 = {
      text: 'Select distributor',
      singleSelection: true
    };

    this.optionList2 = [
      { id: 1, itemName: 'Sort by price.' },
      { id: 2, itemName: 'Sort by date.' },
    ];

    if (localStorage.getItem('sortByPrice') === '1') {
      this.selectedOptions2.push({id: 1, itemName: 'Sort by price.'});
      this.sortBy  = true;
    }
    if (localStorage.getItem('sortByDate') === '1') {
      this.selectedOptions2.push({id: 2, itemName: 'Sort by date.'});
      this.sortBy = false;
    }

    this.optionSettings2 = {
      text: 'Sort announcements',
      singleSelection: true
    };

    this.likedList = JSON.parse(localStorage.getItem('likedList'));
    this.deletedList = JSON.parse(localStorage.getItem('deletedList'));

    // service call
    this.announcementService.getNrFound(this.minPrice, this.maxPrice, this.nrRooms, this.constructionYear, this.distributor)
      .subscribe(result => this.nrAnnouncements = result,
        error => console.log(JSON.stringify(error)),
        () => console.log('Nr received from core: ' + this.nrAnnouncements));

    this.announcementService.getNext20Announcement(this.minPrice, this.maxPrice, this.nrRooms, this.constructionYear, this.distributor,
      0, this.sortBy)
      .subscribe(result => this.announcementsFromCore = result,
                  error => console.log(JSON.stringify(error)),
                  () => this.announcementsFromCore.forEach(announcement => {
                                    if (this.deletedList.indexOf(announcement.id) === -1) {
                                      if (this.likedList.indexOf(announcement.id) === -1) {
                                        // tslint:disable-next-line:max-line-length
                                        this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, price: announcement.price, like: false});
                                      } else {
                                        // tslint:disable-next-line:max-line-length
                                        this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, price: announcement.price, like: true});
                                    }}}));
  }

  onUpdatePreferencesClick() {
    this.findAnnouncements();
    this.announcementService.getNrFound(this.minPrice, this.maxPrice, this.nrRooms, this.constructionYear, this.distributor)
      .subscribe(result => this.nrAnnouncements = result,
        error => console.log(JSON.stringify(error)),
        () => console.log('Nr received from core: ' + this.nrAnnouncements));

    this.announcements = [];
    this.announcementService.getNext20Announcement(this.minPrice, this.maxPrice, this.nrRooms, this.constructionYear, this.distributor,
      0, this.sortBy)
      .subscribe(result => this.announcementsFromCore = result,
        error => console.log(JSON.stringify(error)),
        () => this.announcementsFromCore.forEach(announcement => {
          if (this.deletedList.indexOf(announcement.id) === -1) {
            if (this.likedList.indexOf(announcement.id) === -1) {
              // tslint:disable-next-line:max-line-length
              this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, price: announcement.price, like: false});
            } else {
              // tslint:disable-next-line:max-line-length
              this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, price: announcement.price, like: true});
            }}}));
    this.utilService.createToastrSuccsess('', 'Your preferences are updated.');
  }

  findAnnouncements() {
    console.log('Min price:' + this.minPrice);
    console.log('Max price:' + this.maxPrice);
    console.log('Nr rooms:' + this.nrRooms);

    this.selectedOptions1.forEach(option => console.log(option.itemName));
    this.selectedOptions3.forEach(option => console.log(option.itemName));

    localStorage.setItem('arePreferencesSet', '1');
    localStorage.setItem('minPrice', this.minPrice.toString());
    localStorage.setItem('maxPrice', this.maxPrice.toString());
    localStorage.setItem('nrRooms', this.nrRooms.toString());

    localStorage.setItem('newBuilding', '0');
    localStorage.setItem('oldBuilding', '0');
    localStorage.setItem('owner', '0');
    localStorage.setItem('agent', '0');

    localStorage.setItem('sortByPrice', '0');
    localStorage.setItem('sortByDate', '0');

    this.constructionYear = ConstructionYear.EMPTY;
    this.distributor = Distributor.EMPTY;

    localStorage.setItem('likedList', JSON.stringify([]));
    localStorage.setItem('deletedList', JSON.stringify([]));

    this.selectedOptions1.forEach(option => {
      switch (option.itemName) {
        case ('New buildings(>2000)'):
          localStorage.setItem('newBuilding', '1');
          this.constructionYear = ConstructionYear.AFTER;
          break;
        case 'Old buildings(<2000)':
          localStorage.setItem('oldBuilding', '1');
          this.constructionYear = ConstructionYear.BEFORE;
          break;
      }
    });

    this.selectedOptions3.forEach(option => {
      switch (option.itemName) {
        case 'Sell by owner':
          localStorage.setItem('owner', '1');
          this.distributor = Distributor.PROPRIETAR;
          break;
        case 'Sell by real estate agent':
          localStorage.setItem('agent', '1');
          this.distributor = Distributor.AGENTIE;
          break;
      }
    });

    this.selectedOptions2.forEach(option => {
      switch (option.itemName) {
        case ('Sort by price.'):
          localStorage.setItem('sortByPrice', '1');
          this.sortBy = true;
          break;
        case ('Sort by date.'):
          localStorage.setItem('sortByDate', '1');
          this.sortBy = false;
          break;
      }
    });

    this.likedList = JSON.parse(localStorage.getItem('likedList'));
    this.deletedList = JSON.parse(localStorage.getItem('deletedList'));
    this.announcements = [];
    this.page = 0;

    // call service
    this.announcementService.getNext20Announcement(this.minPrice, this.maxPrice, this.nrRooms, this.constructionYear, this.distributor,
      0, this.sortBy)
      .subscribe(result => this.announcementsFromCore = result,
        error => console.log(JSON.stringify(error)),
        () => this.announcementsFromCore.forEach(announcement => {
          if (this.deletedList.indexOf(announcement.id) === -1) {
            if (this.likedList.indexOf(announcement.id) === -1) {
              // tslint:disable-next-line:max-line-length
              this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, price: announcement.price, like: false});
            } else {
              // tslint:disable-next-line:max-line-length
              this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, price: announcement.price, like: true});
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

    this.selectedOptions1 = [];
    this.selectedOptions3 = [];
    if (localStorage.getItem('newBuilding') === '1') {
      this.selectedOptions1.push({id: 1, itemName: 'New buildings(>2000)'});
    }
    if (localStorage.getItem('oldBuilding') === '1') {
      this.selectedOptions1.push({id: 2, itemName: 'Old buildings(<2000)'});
    }
    if (localStorage.getItem('owner') === '1') {
      this.selectedOptions3.push({id: 3, itemName: 'Sell by owner'});
    }
    if (localStorage.getItem('agent') === '1') {
      this.selectedOptions3.push({ id: 4, itemName: 'Sell by real estate agent' });
    }

    this.selectedOptions2 = [];
    if (localStorage.getItem('sortByPrice') === '1') {
      this.selectedOptions2.push({id: 1, itemName: 'Sort by price.'});
    }
    if (localStorage.getItem('sortByDate') === '1') {
      this.selectedOptions2.push({id: 2, itemName: 'Sort by date.'});
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
    this.announcementService.getNext20Announcement(this.minPrice, this.maxPrice, this.nrRooms, this.constructionYear, this.distributor,
      this.page - 1, this.sortBy)
      .subscribe(result => this.announcementsFromCore = result,
        error => console.log(JSON.stringify(error)),
        () => this.announcementsFromCore.forEach(announcement => {
          if (this.deletedList.indexOf(announcement.id) === -1) {
            if (this.likedList.indexOf(announcement.id) === -1) {
              // tslint:disable-next-line:max-line-length
              this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, price: announcement.price, like: false});
            } else {
              // tslint:disable-next-line:max-line-length
              this.announcements.push({id: announcement.id, title: announcement.title, image: announcement.firstImage, price: announcement.price, like: true});
            }}}));
  }

}
