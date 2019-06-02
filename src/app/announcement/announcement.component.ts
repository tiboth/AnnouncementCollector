import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Comment} from '../shared/model/comment';
import {Announcement} from '../shared/model/announcement';
import {AnnouncementService} from '../shared/service/announcement.service';
import {CommentService} from '../shared/service/comment.service';
import {WebSocketService} from '../shared/service/websocket.service';
import {NgForm} from '@angular/forms';

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

  constructor(private route: ActivatedRoute, private announcementService: AnnouncementService, private commentService: CommentService, private webSocketService: WebSocketService) {
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

    const stompClient = this.webSocketService.connect();

    stompClient.connect({}, frame => {

      stompClient.subscribe( '/comment/' + this.announcementId, notifications => {
        console.log(notifications);
        this.commentsForAnnouncement = JSON.parse(notifications.body);

      });
    });
  }

  ngOnInit() {
  }

  onAddComment(formControl: NgForm) {
    console.log('adding comment: ');
    console.log(this.comment.commentTitle);
    console.log(this.comment.comment);

    this.commentService.addCommentForAnnouncement(this.announcementId, this.comment.commentTitle, this.comment.comment)
      .subscribe(result => console.log('comment added'),
        error => console.log(JSON.stringify(error)));

    formControl.reset();
  }
}
