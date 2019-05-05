import {Component, OnInit} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  announcements = [];
  page = 1;
  minPrice = 50000;
  maxPrice = 80000;
  priceOptions: Options = {
    floor: 10000,
    ceil: 150000,
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

  nrRooms = 1;
  roomOptions: Options = {
    floor: 1,
    ceil: 4,
    showTicks: true,
  };

  optionList = [];
  optionSettings = {};
  selectedOptions = [];

  constructor() { }

  ngOnInit() {
    this.optionList = [
      { id: 1, itemName: 'New buildings(>2000)' },
      { id: 2, itemName: 'Old buildings(<2000)' },
      { id: 3, itemName: 'Detached' },
      { id: 4, itemName: 'Semi detached' },
      { id: 5, itemName: 'Sell by owner' },
      { id: 6, itemName: 'Sell by real estate agent' }
    ];
    this.selectedOptions = [
      { id: 2, itemName: 'Old buildings(<2000)' },
      { id: 3, itemName: 'Detached' }
    ];
    this.optionSettings = {
      text: 'Select options',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };
    for (let i = 1; i <= 100; i++) {
      this.announcements.push('Announcement ' + i + ' title');
    }
  }

  onOptionSelect() {
  }

  OnOptionDeSelect() {
  }

  onSelectAllOptions() {

  }

  onDeSelectAllOptions() {
  }

}
