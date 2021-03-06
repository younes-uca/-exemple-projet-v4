import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueService} from 'src/app/controller/service/DisciplineScientifique.service';
import {DisciplineScientifiqueVo} from 'src/app/controller/model/DisciplineScientifique.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueParentVo} from 'src/app/controller/model/DisciplineScientifiqueParent.model';
import {DisciplineScientifiqueParentService} from 'src/app/controller/service/DisciplineScientifiqueParent.service';
import {DisciplineScientifiqueErcVo} from 'src/app/controller/model/DisciplineScientifiqueErc.model';
import {DisciplineScientifiqueErcService} from 'src/app/controller/service/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcAssociationVo} from 'src/app/controller/model/DisciplineScientifiqueErcAssociation.model';
import {DisciplineScientifiqueErcAssociationService} from 'src/app/controller/service/DisciplineScientifiqueErcAssociation.service';
import {SemanticRelationshipVo} from 'src/app/controller/model/SemanticRelationship.model';
import {SemanticRelationshipService} from 'src/app/controller/service/SemanticRelationship.service';

@Component({
  selector: 'app-discipline-scientifique-view-admin',
  templateUrl: './discipline-scientifique-view-admin.component.html',
  styleUrls: ['./discipline-scientifique-view-admin.component.css']
})
export class DisciplineScientifiqueViewAdminComponent implements OnInit {

        selectedDisciplineScientifiqueErcAssociations: DisciplineScientifiqueErcAssociationVo = new DisciplineScientifiqueErcAssociationVo();
        disciplineScientifiqueErcAssociationsListe: Array<DisciplineScientifiqueErcAssociationVo> = [];

        myDisciplineScientifiqueErcs: Array<DisciplineScientifiqueErcVo> = [];
        mySemanticRelationships: Array<SemanticRelationshipVo> = [];


constructor(private datePipe: DatePipe, private disciplineScientifiqueService: DisciplineScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueParentService: DisciplineScientifiqueParentService
    ,private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
    ,private disciplineScientifiqueErcAssociationService: DisciplineScientifiqueErcAssociationService
    ,private semanticRelationshipService: SemanticRelationshipService
) {
}

// methods
ngOnInit(): void {
                this.selectedDisciplineScientifiqueErcAssociations.disciplineScientifiqueErcVo = new DisciplineScientifiqueErcVo();
                this.disciplineScientifiqueErcService.findAll().subscribe((data) => this.disciplineScientifiqueErcs = data);
                this.selectedDisciplineScientifiqueErcAssociations.semanticRelationshipVo = new SemanticRelationshipVo();
                this.semanticRelationshipService.findAll().subscribe((data) => this.semanticRelationships = data);
    this.selectedDisciplineScientifiqueParent = new DisciplineScientifiqueParentVo();
    this.disciplineScientifiqueParentService.findAll().subscribe((data) => this.disciplineScientifiqueParents = data);
}

hideViewDialog(){
    this.viewDisciplineScientifiqueDialog  = false;
}

// getters and setters

get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
    return this.disciplineScientifiqueService.disciplineScientifiques;
       }
set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }

 get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
    set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }

   get viewDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.viewDisciplineScientifiqueDialog;

       }
    set viewDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.viewDisciplineScientifiqueDialog= value;
       }

       get selectedDisciplineScientifiqueParent(): DisciplineScientifiqueParentVo {
           return this.disciplineScientifiqueParentService.selectedDisciplineScientifiqueParent;
       }
      set selectedDisciplineScientifiqueParent(value: DisciplineScientifiqueParentVo) {
        this.disciplineScientifiqueParentService.selectedDisciplineScientifiqueParent = value;
       }
       get disciplineScientifiqueParents():Array<DisciplineScientifiqueParentVo> {
           return this.disciplineScientifiqueParentService.disciplineScientifiqueParents;
       }
       set disciplineScientifiqueParents(value: Array<DisciplineScientifiqueParentVo>) {
        this.disciplineScientifiqueParentService.disciplineScientifiqueParents = value;
       }
       get editDisciplineScientifiqueParentDialog(): boolean {
           return this.disciplineScientifiqueParentService.editDisciplineScientifiqueParentDialog;
       }
      set editDisciplineScientifiqueParentDialog(value: boolean) {
        this.disciplineScientifiqueParentService.editDisciplineScientifiqueParentDialog= value;
       }
       get selectedDisciplineScientifiqueErc(): DisciplineScientifiqueErcVo {
           return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
       }
      set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
       }
       get disciplineScientifiqueErcs():Array<DisciplineScientifiqueErcVo> {
           return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
       }
       set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
       }
       get editDisciplineScientifiqueErcDialog(): boolean {
           return this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog;
       }
      set editDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.editDisciplineScientifiqueErcDialog= value;
       }
       get selectedSemanticRelationship(): SemanticRelationshipVo {
           return this.semanticRelationshipService.selectedSemanticRelationship;
       }
      set selectedSemanticRelationship(value: SemanticRelationshipVo) {
        this.semanticRelationshipService.selectedSemanticRelationship = value;
       }
       get semanticRelationships():Array<SemanticRelationshipVo> {
           return this.semanticRelationshipService.semanticRelationships;
       }
       set semanticRelationships(value: Array<SemanticRelationshipVo>) {
        this.semanticRelationshipService.semanticRelationships = value;
       }
       get editSemanticRelationshipDialog(): boolean {
           return this.semanticRelationshipService.editSemanticRelationshipDialog;
       }
      set editSemanticRelationshipDialog(value: boolean) {
        this.semanticRelationshipService.editSemanticRelationshipDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
