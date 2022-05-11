import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './controller/service/Auth.service';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { RoleService } from './controller/service/role.service';
@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  animations: [
    trigger('inline', [
      state(
        'hidden',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      state(
        'hiddenAnimated',
        style({
          height: '0px',
          overflow: 'hidden',
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*',
        })
      ),
      transition(
        'visibleAnimated => hiddenAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
      transition(
        'hiddenAnimated => visibleAnimated',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class AppMenuComponent implements OnInit {
  model: any[];
  modelsuperadmin:any[];
  modelanonymous: any[];
    modelchercheur : any[];
  constructor(public app: AppComponent,
   public appMain: AppMainComponent,
   private roleService: RoleService,
   private authService:AuthService,
  private router: Router) {}

  ngOnInit() {


    this.modelchercheur =
      [
              {
                label: 'distinction',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Distinction',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/distinction/list']
                    },
                    {
                      label: 'Nouveau Distinction',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/distinction/create']
                    },
                    {
                      label: 'Liste Distinction discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/distinction-discipline-scientifique/list']
                    },
                ]
              },
              {
                label: 'referentiel',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Semantic relationship',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/semantic-relationship/list']
                    },
                    {
                      label: 'Liste Key word',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/key-word/list']
                    },
                    {
                      label: 'Liste Enjeux ird',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/enjeux-ird/list']
                    },
                    {
                      label: 'Liste Discipline scientifique parent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/discipline-scientifique-parent/list']
                    },
                    {
                      label: 'Liste Discipline scientifique',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/discipline-scientifique/list']
                    },
                    {
                      label: 'Liste Key word discipline scientifique erc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/key-word-discipline-scientifique-erc/list']
                    },
                    {
                      label: 'Liste Discipline scientifique erc association',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/discipline-scientifique-erc-association/list']
                    },
                    {
                      label: 'Liste Discipline scientifique erc',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/discipline-scientifique-erc/list']
                    },
                    {
                      label: 'Liste Discipline scientifique erc parent',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/discipline-scientifique-erc-parent/list']
                    },
                    {
                      label: 'Liste Identifiant recherche',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/identifiant-recherche/list']
                    },
                ]
              },
              {
                label: 'campagne',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Campagne',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/campagne/list']
                    },
                    {
                      label: 'Liste Etat etape campagne',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/etat-etape-campagne/list']
                    },
                ]
              },
              {
                label: 'chercheur',
                icon: 'pi pi-wallet',
                items:[
                    {
                      label: 'Liste Enjeux ird chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/enjeux-ird-chercheur/list']
                    },
                    {
                      label: 'Liste Chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/chercheur/list']
                    },
                    {
                      label: 'Liste Discipline scientifique chercheur',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/referentiel/discipline-scientifique-chercheur/list']
                    },
                    {
                      label: 'Liste Identifiant auteur expert',
                      icon: 'pi pi-fw pi-plus-circle',
                      routerLink: ['/app/chercheur/formulaire/identifiant-auteur-expert/list']
                    },
                ]
              },
    ]
        if (this.authService.authenticated) {
      if (this.authService.authenticatedUser.roles) {

        this.authService.authenticatedUser.roles.forEach(role => {
          const roleName: string = this.getRole(role);
          this.roleService._role.next(roleName.toUpperCase());
          eval('this.model = this.model' + this.getRole(role));
        })
      }

    }
  }
  getRole(text){
  const [role, ...rest] = text.split('_');
  return rest.join('').toLowerCase();
}
  onMenuClick(event) {
    this.appMain.onMenuClick(event);
  }
}
