import { Component, OnInit } from '@angular/core';
import {Comment} from '../shared/model/comment';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  comment: Comment;

  commentsForAnnouncement: Array<Comment>;

  c1: Comment;
  c2: Comment;
  c3: Comment;

  constructor() {
    this.comment = new Comment();

    // for test
    this.c1 = new Comment();
    this.c1.title = 'Title 1';
    this.c1.description = 'Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo\n' +
      '              accumsan, sed semper nisi sollicitudin. Curabitur purus sem, malesuada eu luctus eget, suscipit sed\n' +
      '              turpis. Nam pellentesque felis vitae justo\n' +
      '              accumsan, sed semper nisi sollicitudin. Curabitur purus sem, malesuada eu luctus eget, suscipit sed\n' +
      '              turpis. Nam pellentesque felis vitae justo\n' +
      '              accumsan, sed semper nisi sollicitudin';
    this.c1.date = new Date('2019-05-03');

    this.c2 = new Comment();
    this.c2.title = 'Title 2';
    this.c2.description = 'Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo\n' +
      '              accumsan, sed semper nisi sollicitudin. Curabitur purus sem, malesuada eu luctus eget, suscipit sed\n' +
      '              turpis.';
    this.c2.date = new Date('2018-03-09');

    this.c3 = new Comment();
    this.c3.title = 'Title 3';
    this.c3.description = 'Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo\n' +
      '              accumsan, sed semper nisi sollicitudin. Curabitur purus sem, malesuada eu luctus eget, suscipit sed\n' +
      '              turpis. Nam pellentesque felis vitae justo ' +
      '              accumsan, sed semper nisi sollicitudin';
    this.c3.date = new Date('2019-02-26');

    console.log(this.c1);
    console.log(this.c2);
    console.log(this.c3);
    this.commentsForAnnouncement = new Array<Comment>();
    this.commentsForAnnouncement.push(this.c1);
    this.commentsForAnnouncement.push(this.c2);
    this.commentsForAnnouncement.push(this.c3);
  }

  ngOnInit() {
  }

  onAddComment() {
    console.log(this.comment.title);
    console.log(this.comment.description);
    console.log(new Date());
  }

}
