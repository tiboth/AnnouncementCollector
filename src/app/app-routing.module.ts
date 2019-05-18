import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementsComponent} from './announcements/announcements.component';
import { AboutUsComponent} from './about-us/about-us.component';
import { ErrorComponent} from './error/error.component';
import {AnnouncementComponent} from './announcement/announcement.component';
import {PreferenceComponent} from './preference/preference.component';
import {Statistic1Component} from './statistics/statistic1/statistic1.component';
import {Statistic2Component} from './statistics/statistic2/statistic2.component';
import {Statistic3Component} from './statistics/statistic3/statistic3.component';

const routes: Routes = [
  {path: '', redirectTo: '/preference', pathMatch: 'full'},
  {path: 'announcements', component: AnnouncementsComponent},
  {path: 'statistic1', component: Statistic1Component},
  {path: 'statistic2', component: Statistic2Component},
  {path: 'statistic3', component: Statistic3Component},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'announcement/:id', component: AnnouncementComponent},
  {path: 'preference', component: PreferenceComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
