import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AgmCoreModule} from '@agm/core';

import { ScrollToModule} from 'ng2-scroll-to-el';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorComponent } from './error/error.component';
import {Ng5SliderModule} from 'ng5-slider';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AnnouncementComponent } from './announcement/announcement.component';
import {CarouselModule} from 'ngx-bootstrap';
import { PreferenceComponent } from './preference/preference.component';
import {ArchwizardModule} from 'angular-archwizard';
import { CollapsibleModule } from 'angular2-collapsible';
import { Statistic1Component } from './statistics/statistic1/statistic1.component';
import { Statistic2Component } from './statistics/statistic2/statistic2.component';
import { Statistic3Component } from './statistics/statistic3/statistic3.component';
import {ToastrModule} from 'ngx-toastr';
import {UtilService} from './shared/service/util.service';
import {AnnouncementService} from './shared/service/announcement.service';
import {CommentService} from './shared/service/comment.service';
import {HttpClientModule} from '@angular/common/http';
import {PriceFluctuationService} from './shared/service/price-fluctuation.service';


@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsComponent,
    AboutUsComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    AnnouncementComponent,
    PreferenceComponent,
    Statistic1Component,
    Statistic2Component,
    Statistic3Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    ScrollToModule.forRoot(),
    Ng5SliderModule,
    AngularMultiSelectModule,
    FormsModule,
    NgxPaginationModule,
    CarouselModule,
    ArchwizardModule,
    BrowserAnimationsModule,
    CollapsibleModule,
    ScrollToModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBMXtTwi13R4l2-vbCxsOv5ciPk-PJ15T8'
    })
  ],
  providers: [
    UtilService,
    AnnouncementService,
    CommentService,
    PriceFluctuationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
