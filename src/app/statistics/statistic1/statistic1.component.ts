import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {PriceFluctuationService} from '../../shared/service/price-fluctuation.service';
import {StatisticResult} from '../../shared/model/statistic.result';

@Component({
  selector: 'app-statistic1',
  templateUrl: './statistic1.component.html',
  styleUrls: ['./statistic1.component.css']
})
export class Statistic1Component implements OnInit {

  chart = [];
  dates: Array<string> = [];
  meanPriceList: Array<number> = [];
  preferenceMeanPriceList: Array<number> = [];

  responseFromServer: StatisticResult;

  nrRooms = '1';
  constructionYear = 'Empty';
  distributor = 'Empty';

  constructor(private priceFluctuation: PriceFluctuationService) {
    this.nrRooms = localStorage.getItem('nrRooms');
    if (localStorage.getItem('newBuilding') === '1') {
      this.constructionYear = 'After';
    }
    if (localStorage.getItem('oldBuilding') === '1') {
      this.constructionYear = 'Before';
    }
    if (localStorage.getItem('owner') === '1') {
      this.distributor = 'Proprietar';
    }
    if (localStorage.getItem('agent') === '1') {
      this.distributor = 'Agentie';
    }
    this.priceFluctuation.getStatistics(this.nrRooms, this.constructionYear, this.distributor)
      .subscribe(res => {
          this.responseFromServer = res;
          console.log('res:' + res);
        },
        error => console.log(JSON.stringify(error)),
        () => {
          console.log('response:' + this.responseFromServer);
          this.responseFromServer.dates.forEach(d => this.dates.push(d));
          this.responseFromServer.meanPriceList.forEach(p => this.meanPriceList.push(p));
          this.responseFromServer.preferenceMeanPriceList.forEach(p => this.preferenceMeanPriceList.push(p));

          this.chart = new Chart(document.getElementById('line-chart'), {
            type: 'line',
            data: {
              labels: this.dates,
              datasets: [{
                data: this.meanPriceList,
                label: 'Mean price/m^2',
                borderColor: '#3e95cd',
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
        });
  }

  ngOnInit() {  }
}

