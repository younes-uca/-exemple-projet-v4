
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { EtatEtapeCampagneChercheurComponent } from './etat-etape-campagne-chercheur/etat-etape-campagne-chercheur.component';



    import { CampagneChercheurComponent } from './campagne-chercheur/campagne-chercheur.component';


@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [


                        {

                            path: 'etat-etape-campagne',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatEtapeCampagneChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'campagne',
                            children: [
                                {
                                    path: 'list',
                                    component: CampagneChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class CampagneChercheurRoutingModule { }
