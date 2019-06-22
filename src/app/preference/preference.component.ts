import {Component, EventEmitter, OnInit} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UtilService} from '../shared/service/util.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {

  sliderRefresh: EventEmitter<void> = new EventEmitter<void>();

  minPrice = 100;
  maxPrice = 300;
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

  nrRooms = 1;
  roomOptions2: Options;

  // year
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

  constructor(private router: Router, private utilService: UtilService) {
  }

  ngOnInit() {
    this.roomOptions2 = {
      floor: 1,
      ceil: 4,
      showTicks: true
    };
    console.log(this.roomOptions2);

    this.optionList1 = [
      {id: 1, itemName: 'New buildings(>2000)'},
      {id: 2, itemName: 'Old buildings(<2000)'},
    ];
    this.optionSettings1 = {
      text: 'Select construction year',
      limitSelection: 1
    };

    this.optionList3 = [
      {id: 3, itemName: 'Sell by owner'},
      {id: 4, itemName: 'Sell by real estate agent'}
    ];
    this.selectedOptions3.push({id: 4, itemName: 'Sell by real estate agent'});
    this.optionSettings3 = {
      text: 'Select distributor',
      singleSelection: true
    };

    this.optionList2 = [
      {id: 1, itemName: 'Sort by price.'},
      {id: 2, itemName: 'Sort by date.'},
    ];

    this.selectedOptions2.push({id: 2, itemName: 'Sort by date.'});

    this.optionSettings2 = {
      text: 'Sort announcements',
      singleSelection: true,
    };
  }

  onOptionSelect() {
  }

  OnOptionDeSelect() {
  }

  onSelectAllOptions() {

  }

  onDeSelectAllOptions() {
  }

  finishFunction() {
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

    this.selectedOptions1.forEach(option => {
        switch (option.itemName) {
          case ('New buildings(>2000)'):
            localStorage.setItem('newBuilding', '1');
            break;
          case 'Old buildings(<2000)':
            localStorage.setItem('oldBuilding', '1');
            break;
        }
      }
    );
    this.selectedOptions3.forEach(option => {
        switch (option.itemName) {
          case 'Sell by owner':
            localStorage.setItem('owner', '1');
            break;
          case 'Sell by real estate agent':
            localStorage.setItem('agent', '1');
            break;
        }
      }
    );
    this.selectedOptions2.forEach(option => {
        switch (option.itemName) {
          case ('Sort by price.'):
            localStorage.setItem('sortByPrice', '1');
            break;
          case 'Sort by date.':
            localStorage.setItem('sortByDate', '1');
            break;
        }
      }
    );
    this.showSuccess();
    this.router.navigate(['announcements']);
  }

  refreshSlider(): void {
    this.sliderRefresh.emit();
  }

  showSuccess() {
    this.utilService.createToastrSuccsess('', 'Your preferences are saved.');
  }
}
