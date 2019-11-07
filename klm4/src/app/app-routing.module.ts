import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/mainpage/home.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {WorkplaceMapComponent} from './components/workplace-map/workplace-map.component';
import {RequestFormComponent} from './components/request-form/request-form.component';
import {DamagedFormComponent} from './components/damaged-form/damaged-form.component';
import {OpenstaandComponent} from './components/meldingen/openstaand/openstaand.component';
import {AdminpageComponent} from './components/adminpage/adminpage.component';
import {UsersoverviewComponent} from './components/adminpage/users/usersoverview/usersoverview.component';
import {UserspageComponent} from './components/adminpage/users/userspage/userspage.component';
import {UsersCreateComponent} from './components/adminpage/users/users-create/users-create.component';
import {EquipmentsoverviewComponent} from './components/adminpage/equipment/equipmentsoverview/equipmentsoverview.component';
import {EquipmentspageComponent} from './components/adminpage/equipment/equipmentspage/equipmentspage.component';
import {EquipmentsCreateComponent} from './components/adminpage/equipment/equipments-create/equipments-create.component';
import {SystemLogsComponent} from './components/adminpage/system-logs/system-logs.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'admin', component: AdminpageComponent, children: [
      {
        path: 'users', component: UserspageComponent, children: [
          {path: 'overview', component: UsersoverviewComponent},
          {path: 'create', component: UsersCreateComponent}
        ]
      },
      {
        path: 'equipments', component: EquipmentspageComponent, children: [
          {path: 'overview', component: EquipmentsoverviewComponent},
          {path: 'create', component: EquipmentsCreateComponent}
        ]
      },
      {path: 'logs', component: SystemLogsComponent}
    ]
  },
  {path: 'signin', component: SignInComponent},
  {path: 'map', component: WorkplaceMapComponent},
  {path: 'request-Form', component: RequestFormComponent},
  {path: 'damaged-form', component: DamagedFormComponent},
  {path: 'meldingen-openstaand', component: OpenstaandComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '*', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
