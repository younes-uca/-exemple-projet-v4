import {Component, OnInit} from '@angular/core';
import {KeyWordService} from '../../../../../../controller/service/KeyWord.service';
import {KeyWordVo} from '../../../../../../controller/model/KeyWord.model';
import {RoleService} from '../../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {ChercheurVo} from '../../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../../controller/service/Chercheur.service';


@Component({
  selector: 'app-key-word-view-chercheur',
  templateUrl: './key-word-view-chercheur.component.html',
  styleUrls: ['./key-word-view-chercheur.component.css']
})
export class KeyWordViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private keyWordService: KeyWordService
    ,       private roleService: RoleService
    ,       private messageService: MessageService
    ,       private router: Router
    ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewKeyWordDialog  = false;
}

// getters and setters

get hideKeyWordChercheur(): boolean {
        return this.selectedKeyWord.username != null;
    }

get selectedChercheur(): ChercheurVo {
    return this.chercheurService.selectedChercheur;
}
get keyWords(): Array<KeyWordVo> {
    return this.keyWordService.keyWords;
       }
set keyWords(value: Array<KeyWordVo>) {
        this.keyWordService.keyWords = value;
       }

 get selectedKeyWord(): KeyWordVo {
           return this.keyWordService.selectedKeyWord;
       }
    set selectedKeyWord(value: KeyWordVo) {
        this.keyWordService.selectedKeyWord = value;
       }

   get viewKeyWordDialog(): boolean {
           return this.keyWordService.viewKeyWordDialog;

       }
    set viewKeyWordDialog(value: boolean) {
        this.keyWordService.viewKeyWordDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
