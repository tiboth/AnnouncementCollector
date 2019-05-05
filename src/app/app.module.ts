import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScrollToModule} from 'ng2-scroll-to-el';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorComponent } from './error/error.component';
import {Ng5SliderModule} from 'ng5-slider';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {FormsModule} from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AnnouncementComponent } from './announcement/announcement.component';
import {CarouselModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsComponent,
    AnalyticsComponent,
    AboutUsComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    AnnouncementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    ScrollToModule.forRoot(),
    Ng5SliderModule,
    AngularMultiSelectModule,
    FormsModule,
    NgxPaginationModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
