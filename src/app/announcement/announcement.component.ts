import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Comment} from '../shared/model/comment';
import {Announcement} from '../shared/model/announcement';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  // Announcement variables
  announcement: Announcement;

  // Comment section variables
  comment: Comment;
  commentsForAnnouncement: Array<Comment>;
  c1: Comment; // delete me
  c2: Comment; // delete me
  c3: Comment; // delete me

  constructor(private route: ActivatedRoute) {
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
    this.announcement = new Announcement();
    this.announcement.id = this.route.snapshot.params.id;
    this.announcement.title = 'Real Estate Announcement title';
    this.announcement.description = 'Apartamentele semifinisate mi-au starnit creativitatea in alegerea personala, incearca si tu!\n' +
            'Blitz ofera spre vanzare un apartament de 4 camere, cu o suprafata utila de 93 mp, compartimentarea fiind decomandata, ' +
            'situat in zona istorica a Clujului, zona centrala, o zona in care oricine si-ar dori sa locuiasca. Apartamentul se vinde la ' +
            'stadiul de semifinisat, cu lavabila pe pereti, incalzire in pardoseala intreaga suprafata a imobilului, instalatie foarte ' +
            'bine gandita astfel incat toate utilitatile sa fie separate. Dispune de centrala termica proprie si geamuri termopan cu' +
            'tamplarie din PVC.  Locuinta este una foarte luminoasa deoarece are atat expunere sudica cat si expunere vestica, acestea ' +
            'doua fiind cele mai cautate deoarece pe tot parcursul zilei apartamntul este luminat.\n Imaginile au caracter informativ ' +
            'dar designul interior este gandit si realizat special pentru compartimentarea acestui apartament.';
    this.announcement.originalLink = 'https://www.olx.ro/oferta/casa-ultracentral-480mp-pretabila-si-pentru-activitati-comerciale-IDcqIOr.html';
    const images = ['https://img2.imonet.ro/XA05/A0500I10CDC/apartament-de-vanzare-2-camere-bucuresti-militari-106563804_620x465.jpg',
        'https://nobili-interior-design.ro/images/design-interior-apartament-modern-Constanta.jpg',
        'https://www.studioinsign.ro/wp-content/uploads/2016/05/Amenajare-interioara-Apartament-modern-Bucuresti-28.jpg'];
    this.announcement.images = images;

    console.log('Getting announcement with id=' + this.announcement.id + '...');
  }

  onAddComment() {
    console.log(this.comment.title);
    console.log(this.comment.description);
    console.log(new Date());
  }
}
