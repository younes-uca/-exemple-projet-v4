
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';

import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [
                        {
                            path: 'login',
                            children: [
                                {
                                    path: '',
                                    component: LoginAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {

                            path: 'distinction',
                            loadChildren: './view/distinction/distinction-routing.module#DistinctionAdminRoutingModule',
                            canActivate: [AuthGuard],
                        },
                        {

                            path: 'referentiel',
                            loadChildren: './view/referentiel/referentiel-routing.module#ReferentielAdminRoutingModule',
                            canActivate: [AuthGuard],
                        },
                        {

                            path: 'campagne',
                            loadChildren: './view/campagne/campagne-routing.module#CampagneAdminRoutingModule',
                            canActivate: [AuthGuard],
                        },
                        {

                            path: 'chercheur',
                            loadChildren: './view/chercheur/chercheur-routing.module#ChercheurAdminRoutingModule',
                            canActivate: [AuthGuard],
                        },
                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class AdminRoutingModule { }