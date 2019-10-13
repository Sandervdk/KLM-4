import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/mainpage/home.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {WorkplaceMapComponent} from './components/workplace-map/workplace-map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {RequestFormComponent} from './components/request-form/request-form.component';
import {DamagedFormComponent} from './components/damaged-form/damaged-form.component';
import {OpenstaandComponent} from './components/meldingen/openstaand/openstaand.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    SignInComponent,
    WorkplaceMapComponent,
    RequestFormComponent,
    DamagedFormComponent,
    OpenstaandComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
