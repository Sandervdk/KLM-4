import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/mainpage/home.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { WorkplaceMapComponent } from './components/workplace-map/workplace-map.component';
import {RequestFormComponent} from "./components/request-form/request-form.component";
import {DamagedFormComponent} from './components/damaged-form/damaged-form.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'map', component: WorkplaceMapComponent },
  { path: 'request-Form', component: RequestFormComponent },
  { path: 'damaged-form', component: DamagedFormComponent},
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
