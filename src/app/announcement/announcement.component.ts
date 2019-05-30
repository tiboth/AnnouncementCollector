import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Comment} from '../shared/model/comment';
import {Announcement} from '../shared/model/announcement';
import {AnnouncementService} from '../shared/service/announcement.service';
import {CommentService} from '../shared/service/comment.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  // Announcement variables
  announcementId: number;
  announcement = new Announcement();

  // Comment section variables
  comment: Comment;
  commentsForAnnouncement: Array<Comment>;
  c1: Comment; // delete me
  c2: Comment; // delete me
  c3: Comment; // delete me

  constructor(private route: ActivatedRoute, private announcementService: AnnouncementService, private commentService: CommentService) {
    window.scrollTo(0, 0);
    this.announcementId = this.route.snapshot.params.id;
    console.log('Getting announcement with id=' + this.announcementId + '...');
    this.announcementService.getAnnouncement(this.announcementId)
      .subscribe(result => this.announcement = result,
        error => console.log(JSON.stringify(error)));

    this.commentsForAnnouncement = new Array<Comment>();
    this.comment = new Comment();

    this.commentService.getAllCommentsForAnnouncement(this.announcementId)
      .subscribe(result => this.commentsForAnnouncement = result,
        error => console.log(JSON.stringify(error)));

    // for test
    // this.c1 = new Comment();
    // this.c1.commentTitle = 'Title 1';
    // this.c1.comment = 'Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo\n' +
    //   '              accumsan, sed semper nisi sollicitudin. Curabitur purus sem, malesuada eu luctus eget, suscipit sed\n' +
    //   '              turpis. Nam pellentesque felis vitae justo\n' +
    //   '              accumsan, sed semper nisi sollicitudin. Curabitur purus sem, malesuada eu luctus eget, suscipit sed\n' +
    //   '              turpis. Nam pellentesque felis vitae justo\n' +
    //   '              accumsan, sed semper nisi sollicitudin';
    // this.c1.date = new Date('2019-05-03');
    //
    // this.c2 = new Comment();
    // this.c2.commentTitle = 'Title 2';
    // this.c2.comment = 'Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo\n' +
    //   '              accumsan, sed semper nisi sollicitudin. Curabitur purus sem, malesuada eu luctus eget, suscipit sed\n' +
    //   '              turpis.';
    // this.c2.date = new Date('2018-03-09');
    //
    // this.c3 = new Comment();
    // this.c3.commentTitle = 'Title 3';
    // this.c3.comment = 'Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo\n' +
    //   '              accumsan, sed semper nisi sollicitudin. Curabitur purus sem, malesuada eu luctus eget, suscipit sed\n' +
    //   '              turpis. Nam pellentesque felis vitae justo ' +
    //   '              accumsan, sed semper nisi sollicitudin';
    // this.c3.date = new Date('2019-02-26');
    //
    // this.commentsForAnnouncement = new Array<Comment>();
    // this.commentsForAnnouncement.push(this.c1);
    // this.commentsForAnnouncement.push(this.c2);
    // this.commentsForAnnouncement.push(this.c3);
  }

  ngOnInit() {
  }

  onAddComment() {
    console.log('adding comment: ');
    console.log(this.comment.commentTitle);
    console.log(this.comment.comment);

    this.commentService.addCommentForAnnouncement(this.announcementId, this.comment.commentTitle, this.comment.comment)
      .subscribe(result => this.commentsForAnnouncement.push(result),
        error => console.log(JSON.stringify(error)));
  }
}
