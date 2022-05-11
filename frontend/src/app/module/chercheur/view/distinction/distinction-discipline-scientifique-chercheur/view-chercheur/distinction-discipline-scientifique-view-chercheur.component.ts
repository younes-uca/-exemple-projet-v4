import {Component, OnInit} from '@angular/core';
import {DistinctionDisciplineScientifiqueService} from 'src/app/controller/service/DistinctionDisciplineScientifique.service';
import {DistinctionDisciplineScientifiqueVo} from 'src/app/controller/model/DistinctionDisciplineScientifique.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueVo} from 'src/app/controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from 'src/app/controller/service/DisciplineScientifique.service';
import {DistinctionVo} from 'src/app/controller/model/Distinction.model';
import {DistinctionService} from 'src/app/controller/service/Distinction.service';

@Component({
  selector: 'app-distinction-discipline-scientifique-view-chercheur',
  templateUrl: './distinction-discipline-scientifique-view-chercheur.component.html',
  styleUrls: ['./distinction-discipline-scientifique-view-chercheur.component.css']
})
export class DistinctionDisciplineScientifiqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private distinctionDisciplineScientifiqueService: DistinctionDisciplineScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private distinctionService :DistinctionService
) {
}

// methods
ngOnInit(): void {
    this.selectedDistinction = new DistinctionVo();
    this.distinctionService.findAll().subscribe((data) => this.distinctions = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

hideViewDialog(){
    this.viewDistinctionDisciplineScientifiqueDialog  = false;
}

// getters and setters

get distinctionDisciplineScientifiques(): Array<DistinctionDisciplineScientifiqueVo> {
    return this.distinctionDisciplineScientifiqueService.distinctionDisciplineScientifiques;
       }
set distinctionDisciplineScientifiques(value: Array<DistinctionDisciplineScientifiqueVo>) {
        this.distinctionDisciplineScientifiqueService.distinctionDisciplineScientifiques = value;
       }

 get selectedDistinctionDisciplineScientifique():DistinctionDisciplineScientifiqueVo {
           return this.distinctionDisciplineScientifiqueService.selectedDistinctionDisciplineScientifique;
       }
    set selectedDistinctionDisciplineScientifique(value: DistinctionDisciplineScientifiqueVo) {
        this.distinctionDisciplineScientifiqueService.selectedDistinctionDisciplineScientifique = value;
       }

   get viewDistinctionDisciplineScientifiqueDialog():boolean {
           return this.distinctionDisciplineScientifiqueService.viewDistinctionDisciplineScientifiqueDialog;

       }
    set viewDistinctionDisciplineScientifiqueDialog(value: boolean) {
        this.distinctionDisciplineScientifiqueService.viewDistinctionDisciplineScientifiqueDialog= value;
       }

       get selectedDistinction():DistinctionVo {
           return this.distinctionService.selectedDistinction;
       }
      set selectedDistinction(value: DistinctionVo) {
        this.distinctionService.selectedDistinction = value;
       }
       get distinctions():Array<DistinctionVo> {
           return this.distinctionService.distinctions;
       }
       set distinctions(value: Array<DistinctionVo>) {
        this.distinctionService.distinctions = value;
       }
       get editDistinctionDialog():boolean {
           return this.distinctionService.editDistinctionDialog;
       }
      set editDistinctionDialog(value: boolean) {
        this.distinctionService.editDistinctionDialog= value;
       }
       get selectedDisciplineScientifique():DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques():Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get editDisciplineScientifiqueDialog():boolean {
           return this.disciplineScientifiqueService.editDisciplineScientifiqueDialog;
       }
      set editDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.editDisciplineScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
