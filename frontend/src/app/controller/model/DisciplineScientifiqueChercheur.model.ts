import {DisciplineScientifiqueVo} from './DisciplineScientifique.model';
import {DisciplineScientifiqueErcVo} from './DisciplineScientifiqueErc.model';
import {ChercheurVo} from './Chercheur.model';



export class DisciplineScientifiqueChercheurVo {

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
      public disciplineScientifiqueVo: DisciplineScientifiqueVo ;
      public disciplineScientifiqueErcVo: DisciplineScientifiqueErcVo ;
      public chercheurVo: ChercheurVo ;

}
