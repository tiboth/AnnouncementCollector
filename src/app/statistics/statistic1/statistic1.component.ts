import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {PriceFluctuationService} from '../../shared/service/price-fluctuation.service';

@Component({
  selector: 'app-statistic1',
  templateUrl: './statistic1.component.html',
  styleUrls: ['./statistic1.component.css']
})
export class Statistic1Component implements OnInit {

  chart = [];
  tempmax: any;
  tempmin: any;
  alldates: any;
  weatherDates = [];

  constructor(private priceFluctuation: PriceFluctuationService) {
  }

  ngOnInit() {
    // this.priceFluctuation.dailyForecast()
    //   .subscribe(res => {
    //     this.tempmax = res['list'].map(res1 => res1.main.temp_max);
    //     this.tempmin = res['list'].map(res2 => res2.main.temp_min);
    //     this.alldates = res['list'].map(res3 => res3.dt);
    //
    //     this.alldates.forEach((res4) => {
    //       const jsdate = new Date(res4 * 1000);
    //       this.weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
    //     });
    //   });

    this.chart = new Chart(document.getElementById('line-chart'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          data: [49, 50, 48, 44, 42, 39, 46, 42, 40, 46, 45, 50],
          label: 'Mean price/m^2',
          borderColor: '#3e95cd',
          fill: false
        }, {
          data: [46, 51, 45, 43, 41, 41, 40, 39, 45, 44, 48, 45],
          label: 'Mean price/m^2 for your preferences',
          borderColor: '#8e5ea2',
          fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Price fluctuation'
        }
      }
    });
  }
}

