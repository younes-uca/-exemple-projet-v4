import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueErcService} from '../../../../../controller/service/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcVo} from '../../../../../controller/model/DisciplineScientifiqueErc.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueErcParentVo} from '../../../../../controller/model/DisciplineScientifiqueErcParent.model';
import {DisciplineScientifiqueErcParentService} from '../../../../../controller/service/DisciplineScientifiqueErcParent.service';

@Component({
  selector: 'app-discipline-scientifique-erc-view-admin',
  templateUrl: './discipline-scientifique-erc-view-admin.component.html',
  styleUrls: ['./discipline-scientifique-erc-view-admin.component.css']
})
export class DisciplineScientifiqueErcViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueErcParentService :DisciplineScientifiqueErcParentService
) {
}

// methods
ngOnInit(): void {
    this.selectedDisciplineScientifiqueErcParent = new DisciplineScientifiqueErcParentVo();
    this.disciplineScientifiqueErcParentService.findAll().subscribe((data) => this.disciplineScientifiqueErcParents = data);
}

hideViewDialog(){
    this.viewDisciplineScientifiqueErcDialog  = false;
}

// getters and setters

get disciplineScientifiqueErcs(): Array<DisciplineScientifiqueErcVo> {
    return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
       }
set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
       }

 get selectedDisciplineScientifiqueErc():DisciplineScientifiqueErcVo {
           return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
       }
    set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
       }

   get viewDisciplineScientifiqueErcDialog():boolean {
           return this.disciplineScientifiqueErcService.viewDisciplineScientifiqueErcDialog;

       }
    set viewDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.viewDisciplineScientifiqueErcDialog= value;
       }

       get selectedDisciplineScientifiqueErcParent():DisciplineScientifiqueErcParentVo {
           return this.disciplineScientifiqueErcParentService.selectedDisciplineScientifiqueErcParent;
       }
      set selectedDisciplineScientifiqueErcParent(value: DisciplineScientifiqueErcParentVo) {
        this.disciplineScientifiqueErcParentService.selectedDisciplineScientifiqueErcParent = value;
       }
       get disciplineScientifiqueErcParents():Array<DisciplineScientifiqueErcParentVo> {
           return this.disciplineScientifiqueErcParentService.disciplineScientifiqueErcParents;
       }
       set disciplineScientifiqueErcParents(value: Array<DisciplineScientifiqueErcParentVo>) {
        this.disciplineScientifiqueErcParentService.disciplineScientifiqueErcParents = value;
       }
       get editDisciplineScientifiqueErcParentDialog():boolean {
           return this.disciplineScientifiqueErcParentService.editDisciplineScientifiqueErcParentDialog;
       }
      set editDisciplineScientifiqueErcParentDialog(value: boolean) {
        this.disciplineScientifiqueErcParentService.editDisciplineScientifiqueErcParentDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
