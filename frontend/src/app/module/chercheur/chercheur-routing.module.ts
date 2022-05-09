
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';

import { LoginChercheurComponent } from './login-chercheur/login-chercheur.component';
import { RegisterChercheurComponent } from './register-chercheur/register-chercheur.component';

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
                                    component: LoginChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {

                            path: 'distinction',
                            loadChildren: './view/distinction/distinction-chercheur-routing.module#DistinctionChercheurRoutingModule',
                            canActivate: [AuthGuard],
                        },
                        {

                            path: 'referentiel',
                            loadChildren: './view/referentiel/referentiel-chercheur-routing.module#ReferentielChercheurRoutingModule',
                            canActivate: [AuthGuard],
                        },
                        {

                            path: 'campagne',
                            loadChildren: './view/campagne/campagne-chercheur-routing.module#CampagneChercheurRoutingModule',
                            canActivate: [AuthGuard],
                        },
                        {

                            path: 'chercheur',
                            loadChildren: './view/chercheur/chercheur-chercheur-routing.module#ChercheurChercheurRoutingModule',
                            canActivate: [AuthGuard],
                        },
                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class ChercheurRoutingModule { }
