import {EnjeuxIrdVo} from './EnjeuxIrd.model';
import {ChercheurVo} from './Chercheur.model';



export class EnjeuxIrdChercheurVo {

    public id: number;

    public archive: null | boolean;
    public dateArchivage: Date;
    public dateCreation: Date;
    public admin: null | boolean;
    public visible: null | boolean;
    public username: string;
                public dateArchivageMax: string ;
                public dateArchivageMin: string ;
                public dateCreationMax: string ;
                public dateCreationMin: string ;
      public enjeuxIrdVo: EnjeuxIrdVo ;
      public chercheurVo: ChercheurVo ;

}
