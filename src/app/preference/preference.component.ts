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

  optionList = [];
  optionSettings = {};
  selectedOptions = [];

  constructor(private router: Router, private utilService: UtilService) {
  }

  ngOnInit() {
    this.roomOptions2 = {
      floor: 1,
      ceil: 4,
      showTicks: true
    };
    console.log(this.roomOptions2);
    this.optionList = [
      {id: 1, itemName: 'New buildings(>2000)'},
      {id: 2, itemName: 'Old buildings(<2000)'},
      {id: 3, itemName: 'Detached'},
      {id: 4, itemName: 'Semi detached'},
      {id: 5, itemName: 'Sell by owner'},
      {id: 6, itemName: 'Sell by real estate agent'}
    ];
    this.optionSettings = {
      text: 'Select options',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
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
    localStorage.setItem('detached', '0');
    localStorage.setItem('semiDetached', '0');
    localStorage.setItem('owner', '0');
    localStorage.setItem('agent', '0');

    this.selectedOptions.forEach(option => {
        switch (option.itemName) {
          case ('New buildings(>2000)'):
            localStorage.setItem('newBuilding', '1');
            break;
          case 'Old buildings(<2000)':
            localStorage.setItem('oldBuilding', '1');
            break;
          case 'Detached':
            localStorage.setItem('detached', '1');
            break;
          case 'Semi detached':
            localStorage.setItem('semiDetached', '1');
            break;
          case 'Sell by owner':
            localStorage.setItem('owner', '1');
            break;
          case 'Sell by real estate agent':
            localStorage.setItem('agent', '1');
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
