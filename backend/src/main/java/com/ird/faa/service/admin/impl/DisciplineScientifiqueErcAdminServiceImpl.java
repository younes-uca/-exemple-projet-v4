package com.ird.faa.service.admin.impl;

import java.util.List;
import java.util.Date;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.DisciplineScientifiqueErc;
import com.ird.faa.bean.DisciplineScientifiqueErcParent;
import com.ird.faa.dao.DisciplineScientifiqueErcDao;
import com.ird.faa.service.admin.facade.DisciplineScientifiqueErcAdminService;
import com.ird.faa.service.admin.facade.DisciplineScientifiqueErcParentAdminService;

import com.ird.faa.ws.rest.provided.vo.DisciplineScientifiqueErcVo;
import com.ird.faa.service.util.*;

import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class DisciplineScientifiqueErcAdminServiceImpl extends AbstractServiceImpl<DisciplineScientifiqueErc> implements DisciplineScientifiqueErcAdminService {

@Autowired
private DisciplineScientifiqueErcDao disciplineScientifiqueErcDao;

@Autowired
private ArchivableService<DisciplineScientifiqueErc> archivableService;
        @Autowired
        private DisciplineScientifiqueErcParentAdminService disciplineScientifiqueErcParentService ;


@Autowired
private EntityManager entityManager;


@Override
public List<DisciplineScientifiqueErc> findAll(){
        String query = "SELECT o FROM DisciplineScientifiqueErc o where 1=1 ";
        query+= " ORDER BY o.code";
        return entityManager.createQuery(query).getResultList();
}

        @Override
        public List<DisciplineScientifiqueErc> findByDisciplineScientifiqueErcParentCode(String code){
        return disciplineScientifiqueErcDao.findByDisciplineScientifiqueErcParentCode(code);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueErcParentCode(String code){
        return disciplineScientifiqueErcDao.deleteByDisciplineScientifiqueErcParentCode(code);
        }

        @Override
        public List<DisciplineScientifiqueErc> findByDisciplineScientifiqueErcParentId(Long id){
        return disciplineScientifiqueErcDao.findByDisciplineScientifiqueErcParentId(id);
        }

        @Override
        @Transactional
        public int deleteByDisciplineScientifiqueErcParentId(Long id){
        return disciplineScientifiqueErcDao.deleteByDisciplineScientifiqueErcParentId(id);
        }

    @Override
    public DisciplineScientifiqueErc findByCode(String code){
    if( code==null) return null;
    return disciplineScientifiqueErcDao.findByCode(code);
    }

    @Override
    @Transactional
    public int deleteByCode(String  code) {
    return disciplineScientifiqueErcDao.deleteByCode(code);
    }
    @Override
    public DisciplineScientifiqueErc findByIdOrCode(DisciplineScientifiqueErc disciplineScientifiqueErc){
        DisciplineScientifiqueErc resultat=null;
        if(disciplineScientifiqueErc != null){
            if(StringUtil.isNotEmpty(disciplineScientifiqueErc.getId())){
            resultat= disciplineScientifiqueErcDao.getOne(disciplineScientifiqueErc.getId());
            }else if(StringUtil.isNotEmpty(disciplineScientifiqueErc.getCode())) {
            resultat= disciplineScientifiqueErcDao.findByCode(disciplineScientifiqueErc.getCode());
            }
        }
    return resultat;
    }

@Override
public DisciplineScientifiqueErc findById(Long id){
if(id==null) return null;
return disciplineScientifiqueErcDao.getOne(id);
}

@Override
public DisciplineScientifiqueErc findByIdWithAssociatedList(Long id){
return findById(id);
}
     @Override
    public DisciplineScientifiqueErc archiver(DisciplineScientifiqueErc disciplineScientifiqueErc) {
        if (disciplineScientifiqueErc.getArchive() == null) {
        disciplineScientifiqueErc.setArchive(false);
        }
        disciplineScientifiqueErc.setArchive(true);
        disciplineScientifiqueErc.setDateArchivage(new Date());
        disciplineScientifiqueErcDao.save(disciplineScientifiqueErc);
        return disciplineScientifiqueErc;

    }

    @Override
    public DisciplineScientifiqueErc desarchiver(DisciplineScientifiqueErc disciplineScientifiqueErc) {
    if (disciplineScientifiqueErc.getArchive() == null) {
    disciplineScientifiqueErc.setArchive(false);
    }
    disciplineScientifiqueErc.setArchive(false);
    disciplineScientifiqueErc.setDateArchivage(null);
    disciplineScientifiqueErcDao.save(disciplineScientifiqueErc);
    return disciplineScientifiqueErc;
    }



@Transactional
public int deleteById(Long id){
int res=0;
if(disciplineScientifiqueErcDao.findById(id).isPresent())  {
disciplineScientifiqueErcDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public DisciplineScientifiqueErc update(DisciplineScientifiqueErc disciplineScientifiqueErc){
DisciplineScientifiqueErc foundedDisciplineScientifiqueErc = findById(disciplineScientifiqueErc.getId());
if(foundedDisciplineScientifiqueErc==null) return null;
else{
    archivableService.prepare(disciplineScientifiqueErc);
return  disciplineScientifiqueErcDao.save(disciplineScientifiqueErc);
}
}
private void prepareSave(DisciplineScientifiqueErc disciplineScientifiqueErc){
disciplineScientifiqueErc.setDateCreation(new Date());
if(disciplineScientifiqueErc.getArchive() == null)
  disciplineScientifiqueErc.setArchive(false);
if(disciplineScientifiqueErc.getAdmin() == null)
  disciplineScientifiqueErc.setAdmin(false);
if(disciplineScientifiqueErc.getVisible() == null)
  disciplineScientifiqueErc.setVisible(false);



}

@Override
public DisciplineScientifiqueErc save (DisciplineScientifiqueErc disciplineScientifiqueErc){
prepareSave(disciplineScientifiqueErc);

DisciplineScientifiqueErc result =null;
    DisciplineScientifiqueErc foundedDisciplineScientifiqueErc = findByCode(disciplineScientifiqueErc.getCode());
   if(foundedDisciplineScientifiqueErc == null){


    findDisciplineScientifiqueErcParent(disciplineScientifiqueErc);

DisciplineScientifiqueErc savedDisciplineScientifiqueErc = disciplineScientifiqueErcDao.save(disciplineScientifiqueErc);

result = savedDisciplineScientifiqueErc;
   }

return result;
}

@Override
public List<DisciplineScientifiqueErc> save(List<DisciplineScientifiqueErc> disciplineScientifiqueErcs){
List<DisciplineScientifiqueErc> list = new ArrayList<>();
for(DisciplineScientifiqueErc disciplineScientifiqueErc: disciplineScientifiqueErcs){
list.add(save(disciplineScientifiqueErc));
}
return list;
}



@Override
@Transactional
public int delete(DisciplineScientifiqueErc disciplineScientifiqueErc){
    if(disciplineScientifiqueErc.getCode()==null) return -1;

    DisciplineScientifiqueErc foundedDisciplineScientifiqueErc = findByCode(disciplineScientifiqueErc.getCode());
    if(foundedDisciplineScientifiqueErc==null) return -1;
disciplineScientifiqueErcDao.delete(foundedDisciplineScientifiqueErc);
return 1;
}


public List<DisciplineScientifiqueErc> findByCriteria(DisciplineScientifiqueErcVo disciplineScientifiqueErcVo){

String query = "SELECT o FROM DisciplineScientifiqueErc o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",disciplineScientifiqueErcVo.getId());
            query += SearchUtil.addConstraint( "o", "libelleFr","LIKE",disciplineScientifiqueErcVo.getLibelleFr());
            query += SearchUtil.addConstraint( "o", "libelleEng","LIKE",disciplineScientifiqueErcVo.getLibelleEng());
            query += SearchUtil.addConstraint( "o", "code","LIKE",disciplineScientifiqueErcVo.getCode());
            query += SearchUtil.addConstraint( "o", "niveau","=",disciplineScientifiqueErcVo.getNiveau());
            query += SearchUtil.addConstraint( "o", "archive","=",disciplineScientifiqueErcVo.getArchive());
        query += SearchUtil.addConstraintDate( "o", "dateArchivage","=",disciplineScientifiqueErcVo.getDateArchivage());
        query += SearchUtil.addConstraintDate( "o", "dateCreation","=",disciplineScientifiqueErcVo.getDateCreation());
            query += SearchUtil.addConstraint( "o", "admin","=",disciplineScientifiqueErcVo.getAdmin());
            query += SearchUtil.addConstraint( "o", "visible","=",disciplineScientifiqueErcVo.getVisible());
            query += SearchUtil.addConstraint( "o", "username","LIKE",disciplineScientifiqueErcVo.getUsername());
            query += SearchUtil.addConstraintMinMax("o","niveau",disciplineScientifiqueErcVo.getNiveauMin(),disciplineScientifiqueErcVo.getNiveauMax());
            query += SearchUtil.addConstraintMinMaxDate("o","dateArchivage",disciplineScientifiqueErcVo.getDateArchivageMin(),disciplineScientifiqueErcVo.getDateArchivageMax());
            query += SearchUtil.addConstraintMinMaxDate("o","dateCreation",disciplineScientifiqueErcVo.getDateCreationMin(),disciplineScientifiqueErcVo.getDateCreationMax());
    if(disciplineScientifiqueErcVo.getDisciplineScientifiqueErcParentVo()!=null){
        query += SearchUtil.addConstraint( "o", "disciplineScientifiqueErcParent.id","=",disciplineScientifiqueErcVo.getDisciplineScientifiqueErcParentVo().getId());
            query += SearchUtil.addConstraint( "o", "disciplineScientifiqueErcParent.code","LIKE",disciplineScientifiqueErcVo.getDisciplineScientifiqueErcParentVo().getCode());
    }

query+= " ORDER BY o.code";
return entityManager.createQuery(query).getResultList();
}

    private void findDisciplineScientifiqueErcParent(DisciplineScientifiqueErc disciplineScientifiqueErc){
        DisciplineScientifiqueErcParent loadedDisciplineScientifiqueErcParent =disciplineScientifiqueErcParentService.findByIdOrCode(disciplineScientifiqueErc.getDisciplineScientifiqueErcParent());

    if(loadedDisciplineScientifiqueErcParent==null ) {
        return;
    }
    disciplineScientifiqueErc.setDisciplineScientifiqueErcParent(loadedDisciplineScientifiqueErcParent);
    }

@Override
@Transactional
public void delete(List<DisciplineScientifiqueErc> disciplineScientifiqueErcs){
        if(ListUtil.isNotEmpty(disciplineScientifiqueErcs)){
        disciplineScientifiqueErcs.forEach(e->disciplineScientifiqueErcDao.delete(e));
        }
}
@Override
public void update(List<DisciplineScientifiqueErc> disciplineScientifiqueErcs){
if(ListUtil.isNotEmpty(disciplineScientifiqueErcs)){
disciplineScientifiqueErcs.forEach(e->disciplineScientifiqueErcDao.save(e));
}
}



}