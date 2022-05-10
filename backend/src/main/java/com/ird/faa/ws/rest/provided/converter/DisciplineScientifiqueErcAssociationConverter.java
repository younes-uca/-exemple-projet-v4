package  com.ird.faa.ws.rest.provided.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ird.faa.service.util.*;


import com.ird.faa.bean.DisciplineScientifiqueErcAssociation;
import com.ird.faa.ws.rest.provided.vo.DisciplineScientifiqueErcAssociationVo;

@Component
public class DisciplineScientifiqueErcAssociationConverter extends AbstractConverter<DisciplineScientifiqueErcAssociation,DisciplineScientifiqueErcAssociationVo>{

        @Autowired
        private DisciplineScientifiqueConverter disciplineScientifiqueConverter ;
        @Autowired
        private SemanticRelationshipConverter semanticRelationshipConverter ;
        @Autowired
        private DisciplineScientifiqueErcConverter disciplineScientifiqueErcConverter ;
    private Boolean disciplineScientifiqueErc;
    private Boolean disciplineScientifique;
    private Boolean semanticRelationship;

public  DisciplineScientifiqueErcAssociationConverter(){
init(true);
}

@Override
public DisciplineScientifiqueErcAssociation toItem(DisciplineScientifiqueErcAssociationVo vo) {
if (vo == null) {
return null;
} else {
DisciplineScientifiqueErcAssociation item = new DisciplineScientifiqueErcAssociation();
        if(StringUtil.isNotEmpty(vo.getId()))
        item.setId(NumberUtil.toLong(vo.getId()));
            if(vo.getArchive() != null)
            item.setArchive(vo.getArchive());
        if(StringUtil.isNotEmpty(vo.getDateArchivage()))
        item.setDateArchivage(DateUtil.parse(vo.getDateArchivage()));
        if(StringUtil.isNotEmpty(vo.getDateCreation()))
        item.setDateCreation(DateUtil.parse(vo.getDateCreation()));
            if(vo.getAdmin() != null)
            item.setAdmin(vo.getAdmin());
            if(vo.getVisible() != null)
            item.setVisible(vo.getVisible());
        if(StringUtil.isNotEmpty(vo.getUsername()))
        item.setUsername(vo.getUsername());
    if(vo.getDisciplineScientifiqueErcVo()!=null && this.disciplineScientifiqueErc)
        item.setDisciplineScientifiqueErc(disciplineScientifiqueErcConverter.toItem(vo.getDisciplineScientifiqueErcVo())) ;
    if(vo.getDisciplineScientifiqueVo()!=null && this.disciplineScientifique)
        item.setDisciplineScientifique(disciplineScientifiqueConverter.toItem(vo.getDisciplineScientifiqueVo())) ;
    if(vo.getSemanticRelationshipVo()!=null && this.semanticRelationship)
        item.setSemanticRelationship(semanticRelationshipConverter.toItem(vo.getSemanticRelationshipVo())) ;


return item;
}
}

@Override
public DisciplineScientifiqueErcAssociationVo toVo(DisciplineScientifiqueErcAssociation item) {
if (item == null) {
return null;
} else {
DisciplineScientifiqueErcAssociationVo vo = new DisciplineScientifiqueErcAssociationVo();
        if(item.getId()!=null)
        vo.setId(NumberUtil.toString(item.getId()));

        if(item.getArchive()!=null)
        vo.setArchive(item.getArchive());
        if(item.getDateArchivage()!=null)
        vo.setDateArchivage(DateUtil.formateDate(item.getDateArchivage()));
        if(item.getDateCreation()!=null)
        vo.setDateCreation(DateUtil.formateDate(item.getDateCreation()));
        if(item.getAdmin()!=null)
        vo.setAdmin(item.getAdmin());
        if(item.getVisible()!=null)
        vo.setVisible(item.getVisible());
        if(StringUtil.isNotEmpty(item.getUsername()))
        vo.setUsername(item.getUsername());

    if(item.getDisciplineScientifiqueErc()!=null && this.disciplineScientifiqueErc) {
        vo.setDisciplineScientifiqueErcVo(disciplineScientifiqueErcConverter.toVo(item.getDisciplineScientifiqueErc())) ;
    }
    if(item.getDisciplineScientifique()!=null && this.disciplineScientifique) {
        vo.setDisciplineScientifiqueVo(disciplineScientifiqueConverter.toVo(item.getDisciplineScientifique())) ;
    }
    if(item.getSemanticRelationship()!=null && this.semanticRelationship) {
        vo.setSemanticRelationshipVo(semanticRelationshipConverter.toVo(item.getSemanticRelationship())) ;
    }

return vo;
}
}

public void init(Boolean value) {
    disciplineScientifiqueErc = value;
    disciplineScientifique = value;
    semanticRelationship = value;
}


        public DisciplineScientifiqueConverter getDisciplineScientifiqueConverter(){
        return this.disciplineScientifiqueConverter;
        }
        public void setDisciplineScientifiqueConverter(DisciplineScientifiqueConverter disciplineScientifiqueConverter ){
        this.disciplineScientifiqueConverter = disciplineScientifiqueConverter;
        }
        public SemanticRelationshipConverter getSemanticRelationshipConverter(){
        return this.semanticRelationshipConverter;
        }
        public void setSemanticRelationshipConverter(SemanticRelationshipConverter semanticRelationshipConverter ){
        this.semanticRelationshipConverter = semanticRelationshipConverter;
        }
        public DisciplineScientifiqueErcConverter getDisciplineScientifiqueErcConverter(){
        return this.disciplineScientifiqueErcConverter;
        }
        public void setDisciplineScientifiqueErcConverter(DisciplineScientifiqueErcConverter disciplineScientifiqueErcConverter ){
        this.disciplineScientifiqueErcConverter = disciplineScientifiqueErcConverter;
        }

    public boolean  isDisciplineScientifiqueErc(){
    return this.disciplineScientifiqueErc;
    }
    public void  setDisciplineScientifiqueErc(boolean disciplineScientifiqueErc){
    this.disciplineScientifiqueErc = disciplineScientifiqueErc;
    }
    public boolean  isDisciplineScientifique(){
    return this.disciplineScientifique;
    }
    public void  setDisciplineScientifique(boolean disciplineScientifique){
    this.disciplineScientifique = disciplineScientifique;
    }
    public boolean  isSemanticRelationship(){
    return this.semanticRelationship;
    }
    public void  setSemanticRelationship(boolean semanticRelationship){
    this.semanticRelationship = semanticRelationship;
    }




















}
