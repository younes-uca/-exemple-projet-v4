import {Component, OnInit, Input} from '@angular/core';
import {DisciplineScientifiqueParentService} from '../../../../../controller/service/DisciplineScientifiqueParent.service';
import {DisciplineScientifiqueParentVo} from '../../../../../controller/model/DisciplineScientifiqueParent.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-discipline-scientifique-parent-create-admin',
  templateUrl: './discipline-scientifique-parent-create-admin.component.html',
  styleUrls: ['./discipline-scientifique-parent-create-admin.component.css']
})
export class DisciplineScientifiqueParentCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validDisciplineScientifiqueParentLibelleFr = true;
   _validDisciplineScientifiqueParentLibelleEng = true;
   _validDisciplineScientifiqueParentCode = true;




constructor(private datePipe: DatePipe, private disciplineScientifiqueParentService: DisciplineScientifiqueParentService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validDisciplineScientifiqueParentLibelleFr = value;
    this.validDisciplineScientifiqueParentLibelleEng = value;
    this.validDisciplineScientifiqueParentCode = value;
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.disciplineScientifiqueParentService.save().subscribe(disciplineScientifiqueParent=>{
       this.disciplineScientifiqueParents.push({...disciplineScientifiqueParent});
       this.createDisciplineScientifiqueParentDialog = false;
       this.submitted = false;
       this.selectedDisciplineScientifiqueParent = new DisciplineScientifiqueParentVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateDisciplineScientifiqueParentLibelleFr();
this.validateDisciplineScientifiqueParentLibelleEng();
this.validateDisciplineScientifiqueParentCode();

    }

private validateDisciplineScientifiqueParentLibelleFr(){
        if (this.stringUtilService.isEmpty(this.selectedDisciplineScientifiqueParent.libelleFr)) {
            this.errorMessages.push('Libelle fr non valide');
            this.validDisciplineScientifiqueParentLibelleFr = false;
        } else {
            this.validDisciplineScientifiqueParentLibelleFr = true;
        }
    }
private validateDisciplineScientifiqueParentLibelleEng(){
        if (this.stringUtilService.isEmpty(this.selectedDisciplineScientifiqueParent.libelleEng)) {
            this.errorMessages.push('Libelle eng non valide');
            this.validDisciplineScientifiqueParentLibelleEng = false;
        } else {
            this.validDisciplineScientifiqueParentLibelleEng = true;
        }
    }
private validateDisciplineScientifiqueParentCode(){
        if (this.stringUtilService.isEmpty(this.selectedDisciplineScientifiqueParent.code)) {
            this.errorMessages.push('Code non valide');
            this.validDisciplineScientifiqueParentCode = false;
        } else {
            this.validDisciplineScientifiqueParentCode = true;
        }
    }














//openPopup
// methods

hideCreateDialog(){
    this.createDisciplineScientifiqueParentDialog  = false;
    this.setValidation(true);
}

// getters and setters

get disciplineScientifiqueParents(): Array<DisciplineScientifiqueParentVo> {
    return this.disciplineScientifiqueParentService.disciplineScientifiqueParents;
       }
set disciplineScientifiqueParents(value: Array<DisciplineScientifiqueParentVo>) {
        this.disciplineScientifiqueParentService.disciplineScientifiqueParents = value;
       }

 get selectedDisciplineScientifiqueParent():DisciplineScientifiqueParentVo {
           return this.disciplineScientifiqueParentService.selectedDisciplineScientifiqueParent;
       }
    set selectedDisciplineScientifiqueParent(value: DisciplineScientifiqueParentVo) {
        this.disciplineScientifiqueParentService.selectedDisciplineScientifiqueParent = value;
       }

   get createDisciplineScientifiqueParentDialog(): boolean {
           return this.disciplineScientifiqueParentService.createDisciplineScientifiqueParentDialog;

       }
    set createDisciplineScientifiqueParentDialog(value: boolean) {
        this.disciplineScientifiqueParentService.createDisciplineScientifiqueParentDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validDisciplineScientifiqueParentLibelleFr(): boolean {
    return this._validDisciplineScientifiqueParentLibelleFr;
    }

    set validDisciplineScientifiqueParentLibelleFr(value: boolean) {
    this._validDisciplineScientifiqueParentLibelleFr = value;
    }
    get validDisciplineScientifiqueParentLibelleEng(): boolean {
    return this._validDisciplineScientifiqueParentLibelleEng;
    }

    set validDisciplineScientifiqueParentLibelleEng(value: boolean) {
    this._validDisciplineScientifiqueParentLibelleEng = value;
    }
    get validDisciplineScientifiqueParentCode(): boolean {
    return this._validDisciplineScientifiqueParentCode;
    }

    set validDisciplineScientifiqueParentCode(value: boolean) {
    this._validDisciplineScientifiqueParentCode = value;
    }


}
