import {Component, OnInit} from '@angular/core';
import {CampagneService} from 'src/app/controller/service/Campagne.service';
import {CampagneVo} from 'src/app/controller/model/Campagne.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-campagne-view-admin',
  templateUrl: './campagne-view-admin.component.html',
  styleUrls: ['./campagne-view-admin.component.css']
})
export class CampagneViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private campagneService: CampagneService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewCampagneDialog  = false;
}

// getters and setters

get campagnes(): Array<CampagneVo> {
    return this.campagneService.campagnes;
       }
set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }

 get selectedCampagne(): CampagneVo {
           return this.campagneService.selectedCampagne;
       }
    set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }

   get viewCampagneDialog(): boolean {
           return this.campagneService.viewCampagneDialog;

       }
    set viewCampagneDialog(value: boolean) {
        this.campagneService.viewCampagneDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
