import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AnnouncementCollector';

  ngOnInit() {
    localStorage.setItem('arePreferencesSet', '0');
  }
}
