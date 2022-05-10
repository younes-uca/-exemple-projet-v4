import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueChercheurService} from '../../../../../../controller/service/DisciplineScientifiqueChercheur.service';
import {DisciplineScientifiqueChercheurVo} from '../../../../../../controller/model/DisciplineScientifiqueChercheur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from '../../../../../../controller/service/role.service';
import {DatePipe} from '@angular/common';

import { DisciplineScientifiqueService } from '../../../../../../controller/service/DisciplineScientifique.service';
import { DisciplineScientifiqueErcService } from '../../../../../../controller/service/DisciplineScientifiqueErc.service';
import { ChercheurService } from '../../../../../../controller/service/Chercheur.service';

import {DisciplineScientifiqueVo} from '../../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueErcVo} from '../../../../../../controller/model/DisciplineScientifiqueErc.model';
import {ChercheurVo} from '../../../../../../controller/model/Chercheur.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from '../../../../../../controller/service/Auth.service';
import { ExportService } from '../../../../../../controller/service/Export.service';

@Component({
  selector: 'app-discipline-scientifique-chercheur-list-chercheur',
  templateUrl: './discipline-scientifique-chercheur-list-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-chercheur-list-chercheur.component.css']
})
export class DisciplineScientifiqueChercheurListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DisciplineScientifiqueChercheur';
     yesOrNoArchive :any[] =[];
     yesOrNoAdmin :any[] =[];
     yesOrNoVisible :any[] =[];
    disciplineScientifiques :Array<DisciplineScientifiqueVo>;
    disciplineScientifiqueErcs :Array<DisciplineScientifiqueErcVo>;
    chercheurs :Array<ChercheurVo>;


    constructor(private datePipe: DatePipe, private disciplineScientifiqueChercheurService: DisciplineScientifiqueChercheurService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private disciplineScientifiqueService: DisciplineScientifiqueService
        , private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
        , private chercheurService: ChercheurService
) { }

    ngOnInit() : void {
      this.loadDisciplineScientifiqueChercheurs();
      this.initExport();
      this.initCol();
      this.loadDisciplineScientifique();
      this.loadDisciplineScientifiqueErc();
      this.loadChercheur();
    this.yesOrNoArchive =  [{label: 'Archive', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoAdmin =  [{label: 'Admin', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    this.yesOrNoVisible =  [{label: 'Visible', value: null},{label: 'Oui', value: 1},{label: 'Non', value: 0}];
    }
    
    // methods
      public async loadDisciplineScientifiqueChercheurs(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueChercheur', 'list');
        isPermistted ? this.disciplineScientifiqueChercheurService.findAll().subscribe(disciplineScientifiqueChercheurs => this.disciplineScientifiqueChercheurs = disciplineScientifiqueChercheurs,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.disciplineScientifiqueChercheurService.findByCriteria(this.searchDisciplineScientifiqueChercheur).subscribe(disciplineScientifiqueChercheurs=>{
            
            this.disciplineScientifiqueChercheurs = disciplineScientifiqueChercheurs;
           // this.searchDisciplineScientifiqueChercheur = new DisciplineScientifiqueChercheurVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'disciplineScientifique?.libelleEng', header: 'Discipline scientifique'},
                        {field: 'disciplineScientifiqueErc?.libelleEng', header: 'Discipline scientifique erc'},
                        {field: 'chercheur?.numeroMatricule', header: 'Chercheur'},
                            {field: 'archive', header: 'Archive'},
                            {field: 'dateArchivage', header: 'Date archivage'},
                            {field: 'dateCreation', header: 'Date creation'},
                            {field: 'admin', header: 'Admin'},
                            {field: 'visible', header: 'Visible'},
                            {field: 'username', header: 'Username'},
        ];
    }
    
    public async editDisciplineScientifiqueChercheur(disciplineScientifiqueChercheur: DisciplineScientifiqueChercheurVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueChercheur', 'edit');
         if(isPermistted){
          this.disciplineScientifiqueChercheurService.findByIdWithAssociatedList(disciplineScientifiqueChercheur).subscribe(res => {
           this.selectedDisciplineScientifiqueChercheur = res;
            this.selectedDisciplineScientifiqueChercheur.dateArchivage = new Date(disciplineScientifiqueChercheur.dateArchivage);
            this.selectedDisciplineScientifiqueChercheur.dateCreation = new Date(disciplineScientifiqueChercheur.dateCreation);
            this.editDisciplineScientifiqueChercheurDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewDisciplineScientifiqueChercheur(disciplineScientifiqueChercheur: DisciplineScientifiqueChercheurVo){
        const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueChercheur', 'view');
        if(isPermistted){
           this.disciplineScientifiqueChercheurService.findByIdWithAssociatedList(disciplineScientifiqueChercheur).subscribe(res => {
           this.selectedDisciplineScientifiqueChercheur = res;
            this.selectedDisciplineScientifiqueChercheur.dateArchivage = new Date(disciplineScientifiqueChercheur.dateArchivage);
            this.selectedDisciplineScientifiqueChercheur.dateCreation = new Date(disciplineScientifiqueChercheur.dateCreation);
            this.viewDisciplineScientifiqueChercheurDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateDisciplineScientifiqueChercheur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedDisciplineScientifiqueChercheur = new DisciplineScientifiqueChercheurVo();
            this.createDisciplineScientifiqueChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteDisciplineScientifiqueChercheur(disciplineScientifiqueChercheur: DisciplineScientifiqueChercheurVo){
       const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueChercheur', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Discipline scientifique chercheur) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.disciplineScientifiqueChercheurService.delete(disciplineScientifiqueChercheur).subscribe(status=>{
                          if(status > 0){
                          const position = this.disciplineScientifiqueChercheurs.indexOf(disciplineScientifiqueChercheur);
                          position > -1 ? this.disciplineScientifiqueChercheurs.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Discipline scientifique chercheur Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }

public async loadDisciplineScientifique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueChercheur', 'list');
    isPermistted ? this.disciplineScientifiqueService.findAll().subscribe(disciplineScientifiques => this.disciplineScientifiques = disciplineScientifiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadDisciplineScientifiqueErc(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueChercheur', 'list');
    isPermistted ? this.disciplineScientifiqueErcService.findAll().subscribe(disciplineScientifiqueErcs => this.disciplineScientifiqueErcs = disciplineScientifiqueErcs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadChercheur(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueChercheur', 'list');
    isPermistted ? this.chercheurService.findAll().subscribe(chercheurs => this.chercheurs = chercheurs,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateDisciplineScientifiqueChercheur(disciplineScientifiqueChercheur: DisciplineScientifiqueChercheurVo) {

     this.disciplineScientifiqueChercheurService.findByIdWithAssociatedList(disciplineScientifiqueChercheur).subscribe(
	 res => {
	       this.initDuplicateDisciplineScientifiqueChercheur(res);
	       this.selectedDisciplineScientifiqueChercheur = res;
	       this.selectedDisciplineScientifiqueChercheur.id = null;
            this.createDisciplineScientifiqueChercheurDialog = true;

});

	}

	initDuplicateDisciplineScientifiqueChercheur(res: DisciplineScientifiqueChercheurVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.disciplineScientifiqueChercheurs.map(e => {
    return {
            'Discipline scientifique': e.disciplineScientifiqueVo?.libelleEng ,
            'Discipline scientifique erc': e.disciplineScientifiqueErcVo?.libelleEng ,
            'Chercheur': e.chercheurVo?.numeroMatricule ,
                    'Archive': e.archive? 'Vrai' : 'Faux' ,
                    'Date archivage': this.datePipe.transform(e.dateArchivage , 'dd-MM-yyyy'),
                    'Date creation': this.datePipe.transform(e.dateCreation , 'dd-MM-yyyy'),
                    'Admin': e.admin? 'Vrai' : 'Faux' ,
                    'Visible': e.visible? 'Vrai' : 'Faux' ,
                    'Username': e.username ,
     }
      });

      this.criteriaData = [{
        'Discipline scientifique': this.searchDisciplineScientifiqueChercheur.disciplineScientifiqueVo?.libelleEng ? this.searchDisciplineScientifiqueChercheur.disciplineScientifiqueVo?.libelleEng : environment.emptyForExport ,
        'Discipline scientifique erc': this.searchDisciplineScientifiqueChercheur.disciplineScientifiqueErcVo?.libelleEng ? this.searchDisciplineScientifiqueChercheur.disciplineScientifiqueErcVo?.libelleEng : environment.emptyForExport ,
        'Chercheur': this.searchDisciplineScientifiqueChercheur.chercheurVo?.numeroMatricule ? this.searchDisciplineScientifiqueChercheur.chercheurVo?.numeroMatricule : environment.emptyForExport ,
            'Archive': this.searchDisciplineScientifiqueChercheur.archive ? (this.searchDisciplineScientifiqueChercheur.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Date archivage Min': this.searchDisciplineScientifiqueChercheur.dateArchivageMin ? this.datePipe.transform(this.searchDisciplineScientifiqueChercheur.dateArchivageMin , this.dateFormat) : environment.emptyForExport ,
            'Date archivage Max': this.searchDisciplineScientifiqueChercheur.dateArchivageMax ? this.datePipe.transform(this.searchDisciplineScientifiqueChercheur.dateArchivageMax , this.dateFormat) : environment.emptyForExport ,
            'Date creation Min': this.searchDisciplineScientifiqueChercheur.dateCreationMin ? this.datePipe.transform(this.searchDisciplineScientifiqueChercheur.dateCreationMin , this.dateFormat) : environment.emptyForExport ,
            'Date creation Max': this.searchDisciplineScientifiqueChercheur.dateCreationMax ? this.datePipe.transform(this.searchDisciplineScientifiqueChercheur.dateCreationMax , this.dateFormat) : environment.emptyForExport ,
            'Admin': this.searchDisciplineScientifiqueChercheur.admin ? (this.searchDisciplineScientifiqueChercheur.admin ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Visible': this.searchDisciplineScientifiqueChercheur.visible ? (this.searchDisciplineScientifiqueChercheur.visible ? environment.trueValue : environment.falseValue) : environment.emptyForExport ,
            'Username': this.searchDisciplineScientifiqueChercheur.username ? this.searchDisciplineScientifiqueChercheur.username : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get disciplineScientifiqueChercheurs() : Array<DisciplineScientifiqueChercheurVo> {
           return this.disciplineScientifiqueChercheurService.disciplineScientifiqueChercheurs;
       }
    set disciplineScientifiqueChercheurs(value: Array<DisciplineScientifiqueChercheurVo>) {
        this.disciplineScientifiqueChercheurService.disciplineScientifiqueChercheurs = value;
       }

    get disciplineScientifiqueChercheurSelections() : Array<DisciplineScientifiqueChercheurVo> {
           return this.disciplineScientifiqueChercheurService.disciplineScientifiqueChercheurSelections;
       }
    set disciplineScientifiqueChercheurSelections(value: Array<DisciplineScientifiqueChercheurVo>) {
        this.disciplineScientifiqueChercheurService.disciplineScientifiqueChercheurSelections = value;
       }
   
     


    get selectedDisciplineScientifiqueChercheur() : DisciplineScientifiqueChercheurVo {
           return this.disciplineScientifiqueChercheurService.selectedDisciplineScientifiqueChercheur;
       }
    set selectedDisciplineScientifiqueChercheur(value: DisciplineScientifiqueChercheurVo) {
        this.disciplineScientifiqueChercheurService.selectedDisciplineScientifiqueChercheur = value;
       }
    
    get createDisciplineScientifiqueChercheurDialog() :boolean {
           return this.disciplineScientifiqueChercheurService.createDisciplineScientifiqueChercheurDialog;
       }
    set createDisciplineScientifiqueChercheurDialog(value: boolean) {
        this.disciplineScientifiqueChercheurService.createDisciplineScientifiqueChercheurDialog= value;
       }
    
    get editDisciplineScientifiqueChercheurDialog() :boolean {
           return this.disciplineScientifiqueChercheurService.editDisciplineScientifiqueChercheurDialog;
       }
    set editDisciplineScientifiqueChercheurDialog(value: boolean) {
        this.disciplineScientifiqueChercheurService.editDisciplineScientifiqueChercheurDialog= value;
       }
    get viewDisciplineScientifiqueChercheurDialog() :boolean {
           return this.disciplineScientifiqueChercheurService.viewDisciplineScientifiqueChercheurDialog;
       }
    set viewDisciplineScientifiqueChercheurDialog(value: boolean) {
        this.disciplineScientifiqueChercheurService.viewDisciplineScientifiqueChercheurDialog = value;
       }
       
     get searchDisciplineScientifiqueChercheur() : DisciplineScientifiqueChercheurVo {
        return this.disciplineScientifiqueChercheurService.searchDisciplineScientifiqueChercheur;
       }
    set searchDisciplineScientifiqueChercheur(value: DisciplineScientifiqueChercheurVo) {
        this.disciplineScientifiqueChercheurService.searchDisciplineScientifiqueChercheur = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
