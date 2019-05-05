import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  idAnnouncement: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.idAnnouncement = this.route.snapshot.params.id;

    console.log('Getting announcement with id=' + this.idAnnouncement + '...');
  }

}
