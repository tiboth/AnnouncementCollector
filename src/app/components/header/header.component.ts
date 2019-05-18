import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick() {
    if (localStorage.getItem('arePreferencesSet') === '0' || localStorage.getItem('arePreferencesSet') === null) {
      console.log(localStorage.getItem('arePreferencesSet'));
      this.router.navigate(['preference']);
    } else {
      console.log(localStorage.getItem('arePreferencesSet'));
      this.router.navigate(['announcements']);
    }
  }


}
