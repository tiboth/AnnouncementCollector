import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementsComponent} from './announcements/announcements.component';
import { AnalyticsComponent} from './analytics/analytics.component';
import { AboutUsComponent} from './about-us/about-us.component';
import { ErrorComponent} from './error/error.component';
import {AnnouncementComponent} from './announcement/announcement.component';

const routes: Routes = [
  {path: '', redirectTo: '/announcements', pathMatch: 'full'},
  {path: 'announcements', component: AnnouncementsComponent},
  {path: 'analytics', component: AnalyticsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'announcement/:id', component: AnnouncementComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
