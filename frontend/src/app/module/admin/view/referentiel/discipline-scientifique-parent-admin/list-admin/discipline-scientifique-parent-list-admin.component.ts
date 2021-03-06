import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueParentService} from 'src/app/controller/service/DisciplineScientifiqueParent.service';
import {DisciplineScientifiqueParentVo} from 'src/app/controller/model/DisciplineScientifiqueParent.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';



import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-discipline-scientifique-parent-list-admin',
  templateUrl: './discipline-scientifique-parent-list-admin.component.html',
  styleUrls: ['./discipline-scientifique-parent-list-admin.component.css']
})
export class DisciplineScientifiqueParentListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifiqueParent';
     yesOrNoArchive :any[] =[];


    constructor(private datePipe: DatePipe, private disciplineScientifiqueParentService: DisciplineScientifiqueParentService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadDisciplineScientifiqueParents();
      this.initExport();
      this.initCol();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadDisciplineScientifiqueParents(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueParent', 'list');
        isPermistted ? this.disciplineScientifiqueParentService.findAll().subscribe(disciplineScientifiqueParents => this.disciplineScientifiqueParents = disciplineScientifiqueParents,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'probl??me d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueParentService.findByCriteria(this.searchDisciplineScientifiqueParent).subscribe(disciplineScientifiqueParents=>{
            
            this.disciplineScientifiqueParents = disciplineScientifiqueParents;
           // this.searchDisciplineScientifiqueParent = new DisciplineScientifiqueParentVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelleFr', header: 'Libelle fr'},
                            {field: 'libelleEng', header: 'Libelle eng'},
                            {field: 'code', header: 'Code'},
                            {field: 'niveau', header: 'Niveau'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
        ];
    }
    
    public async editDisciplineScientifiqueParent(disciplineScientifiqueParent: DisciplineScientifiqueParentVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueParent', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueParentService.findByIdWithAssociatedList(disciplineScientifiqueParent).subscribe(res => {
           this.selectedDisciplineScientifiqueParent = res;
            this.selectedDisciplineScientifiqueParent.dateArchivage = new Date(disciplineScientifiqueParent.dateArchivage);
            this.selectedDisciplineScientifiqueParent.dateCreation = new Date(disciplineScientifiqueParent.dateCreation);
            this.editDisciplineScientifiqueParentDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probl??me de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifiqueParent(disciplineScientifiqueParent: DisciplineScientifiqueParentVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueParent', 'view');
        if(isPermistted){
           this.disciplineScientifiqueParentService.findByIdWithAssociatedList(disciplineScientifiqueParent).subscribe(res => {
           this.selectedDisciplineScientifiqueParent = res;
            this.selectedDisciplineScientifiqueParent.dateArchivage = new Date(disciplineScientifiqueParent.dateArchivage);
            this.selectedDisciplineScientifiqueParent.dateCreation = new Date(disciplineScientifiqueParent.dateCreation);
            this.viewDisciplineScientifiqueParentDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifiqueParent(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifiqueParent = new DisciplineScientifiqueParentVo();
            this.createDisciplineScientifiqueParentDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'probl??me d\'autorisation'
            });
        }
       
    }
public async archiverDisciplineScientifiqueParent(disciplineScientifiqueParent: DisciplineScientifiqueParentVo){
const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueParent', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous archiver cet ??l??ment (Discipline scientifique parent) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.disciplineScientifiqueParentService.archiver(disciplineScientifiqueParent).subscribe(status=>{
const myIndex = this.disciplineScientifiqueParents.indexOf(disciplineScientifiqueParent);
this.disciplineScientifiqueParents[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succ??s',
detail: 'Discipline scientifique parent archiv??',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Probl??me de permission'
});
}
}

public async desarchiverDisciplineScientifiqueParent(disciplineScientifiqueParent: DisciplineScientifiqueParentVo){
const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueParent', 'delete');
if(isPermistted){
this.confirmationService.confirm({
message: 'Voulez-vous d??sarchiver cet ??l??ment (Discipline scientifique parent) ?',
header: 'Confirmation',
icon: 'pi pi-exclamation-triangle',
accept: () => {
this.disciplineScientifiqueParentService.desarchiver(disciplineScientifiqueParent).subscribe(status=>{
const myIndex = this.disciplineScientifiqueParents.indexOf(disciplineScientifiqueParent);
this.disciplineScientifiqueParents[myIndex] = status;
this.messageService.add({
severity: 'success',
summary: 'Succ??s',
detail: 'Discipline scientifique parent d??sarchiv??',
life: 3000
});
},error=>console.log(error))
 }
});
}else{
this.messageService.add({
severity: 'error', summary: 'erreur', detail: 'Probl??me de permission'
});
}
}


    public async deleteDisciplineScientifiqueParent(disciplineScientifiqueParent: DisciplineScientifiqueParentVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueParent', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet ??l??ment (Discipline scientifique parent) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueParentService.delete(disciplineScientifiqueParent).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiqueParents.indexOf(disciplineScientifiqueParent);
                          position > -1 ? this.disciplineScientifiqueParents.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succ??s',
                        detail: 'Discipline scientifique parent Supprim??',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Probl??me de permission'
              });
             }
    }


public async duplicateDisciplineScientifiqueParent(disciplineScientifiqueParent: DisciplineScientifiqueParentVo) {

     this.disciplineScientifiqueParentService.findByIdWithAssociatedList(disciplineScientifiqueParent).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifiqueParent(res);
	       this.selectedDisciplineScientifiqueParent = res;
	       this.selectedDisciplineScientifiqueParent.id = null;
            this.createDisciplineScientifiqueParentDialog = true;

});

	}

	initDuplicateDisciplineScientifiqueParent(res: DisciplineScientifiqueParentVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.disciplineScientifiqueParents.map(e => {
    return {
                    'Libelle fr': e.libelleFr ,
                    'Libelle eng': e.libelleEng ,
                    'Code': e.code ,
                    'Niveau': e.niveau ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
     }
      });

      this.criteriaData = [{
            'Libelle fr': this.searchDisciplineScientifiqueParent.libelleFr ? this.searchDisciplineScientifiqueParent.libelleFr : environment.emptyForExport ,
            'Libelle eng': this.searchDisciplineScientifiqueParent.libelleEng ? this.searchDisciplineScientifiqueParent.libelleEng : environment.emptyForExport ,
            'Code': this.searchDisciplineScientifiqueParent.code ? this.searchDisciplineScientifiqueParent.code : environment.emptyForExport ,
            'Niveau Min': this.searchDisciplineScientifiqueParent.niveauMin ? this.searchDisciplineScientifiqueParent.niveauMin : environment.emptyForExport ,
            'Niveau Max': this.searchDisciplineScientifiqueParent.niveauMax ? this.searchDisciplineScientifiqueParent.niveauMax : environment.emptyForExport ,
            'Archive': this.searchDisciplineScientifiqueParent.archive ? (this.searchDisciplineScientifiqueParent.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchDisciplineScientifiqueParent.dateArchivageMin ? this.datePipe.transform(this.searchDisciplineScientifiqueParent.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchDisciplineScientifiqueParent.dateArchivageMax ? this.datePipe.transform(this.searchDisciplineScientifiqueParent.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchDisciplineScientifiqueParent.dateCreationMin ? this.datePipe.transform(this.searchDisciplineScientifiqueParent.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchDisciplineScientifiqueParent.dateCreationMax ? this.datePipe.transform(this.searchDisciplineScientifiqueParent.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiqueParents() : Array<DisciplineScientifiqueParentVo> {
           return this.disciplineScientifiqueParentService.disciplineScientifiqueParents;
       }
    set disciplineScientifiqueParents(value: Array<DisciplineScientifiqueParentVo>) {
        this.disciplineScientifiqueParentService.disciplineScientifiqueParents = value;
       }

    get disciplineScientifiqueParentSelections() : Array<DisciplineScientifiqueParentVo> {
           return this.disciplineScientifiqueParentService.disciplineScientifiqueParentSelections;
       }
    set disciplineScientifiqueParentSelections(value: Array<DisciplineScientifiqueParentVo>) {
        this.disciplineScientifiqueParentService.disciplineScientifiqueParentSelections = value;
       }
   
     


    get selectedDisciplineScientifiqueParent() : DisciplineScientifiqueParentVo {
           return this.disciplineScientifiqueParentService.selectedDisciplineScientifiqueParent;
       }
    set selectedDisciplineScientifiqueParent(value: DisciplineScientifiqueParentVo) {
        this.disciplineScientifiqueParentService.selectedDisciplineScientifiqueParent = value;
       }
    
    get createDisciplineScientifiqueParentDialog() :boolean {
           return this.disciplineScientifiqueParentService.createDisciplineScientifiqueParentDialog;
       }
    set createDisciplineScientifiqueParentDialog(value: boolean) {
        this.disciplineScientifiqueParentService.createDisciplineScientifiqueParentDialog= value;
       }
    
    get editDisciplineScientifiqueParentDialog() :boolean {
           return this.disciplineScientifiqueParentService.editDisciplineScientifiqueParentDialog;
       }
    set editDisciplineScientifiqueParentDialog(value: boolean) {
        this.disciplineScientifiqueParentService.editDisciplineScientifiqueParentDialog= value;
       }
    get viewDisciplineScientifiqueParentDialog() :boolean {
           return this.disciplineScientifiqueParentService.viewDisciplineScientifiqueParentDialog;
       }
    set viewDisciplineScientifiqueParentDialog(value: boolean) {
        this.disciplineScientifiqueParentService.viewDisciplineScientifiqueParentDialog = value;
       }
       
     get searchDisciplineScientifiqueParent() : DisciplineScientifiqueParentVo {
        return this.disciplineScientifiqueParentService.searchDisciplineScientifiqueParent;
       }
    set searchDisciplineScientifiqueParent(value: DisciplineScientifiqueParentVo) {
        this.disciplineScientifiqueParentService.searchDisciplineScientifiqueParent = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
