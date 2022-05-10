package com.ird.faa.service.chercheur.impl;

import java.util.List;
    import java.util.Date;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
    import com.ird.faa.service.util.StringUtil;
    import com.ird.faa.security.common.SecurityUtil;
    import com.ird.faa.security.bean.User;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import com.ird.faa.bean.EnjeuxIrdChercheur;
        import com.ird.faa.bean.EnjeuxIrd;
        import com.ird.faa.bean.Chercheur;
import com.ird.faa.dao.EnjeuxIrdChercheurDao;
import com.ird.faa.service.chercheur.facade.EnjeuxIrdChercheurChercheurService;
        import com.ird.faa.service.chercheur.facade.EnjeuxIrdChercheurService;
        import com.ird.faa.service.chercheur.facade.ChercheurChercheurService;

import com.ird.faa.ws.rest.provided.vo.EnjeuxIrdChercheurVo;
import com.ird.faa.service.util.*;

    import com.ird.faa.service.core.facade.ArchivableService;
import com.ird.faa.service.core.impl.AbstractServiceImpl;

@Service
public class EnjeuxIrdChercheurChercheurServiceImpl extends AbstractServiceImpl<EnjeuxIrdChercheur> implements EnjeuxIrdChercheurChercheurService {

@Autowired
private EnjeuxIrdChercheurDao enjeuxIrdChercheurDao;

    @Autowired
    private ArchivableService<EnjeuxIrdChercheur> archivableService;
        @Autowired
        private EnjeuxIrdChercheurService enjeuxIrdService ;
        @Autowired
        private ChercheurChercheurService chercheurService ;


@Autowired
private EntityManager entityManager;


@Override
public List<EnjeuxIrdChercheur> findAll(){
    List<EnjeuxIrdChercheur> resultat= new ArrayList();
    resultat.addAll(findAllNonArchive());
    resultat.addAll(findAllByOwner());
    return result;
}

        @Override
        public List<EnjeuxIrdChercheur> findByEnjeuxIrdCode(String code){
        return enjeuxIrdChercheurDao.findByEnjeuxIrdCode(code);
        }

        @Override
        @Transactional
        public int deleteByEnjeuxIrdCode(String code){
        return enjeuxIrdChercheurDao.deleteByEnjeuxIrdCode(code);
        }

        @Override
        public List<EnjeuxIrdChercheur> findByEnjeuxIrdId(Long id){
        return enjeuxIrdChercheurDao.findByEnjeuxIrdId(id);
        }

        @Override
        @Transactional
        public int deleteByEnjeuxIrdId(Long id){
        return enjeuxIrdChercheurDao.deleteByEnjeuxIrdId(id);
        }


        @Override
        public List<EnjeuxIrdChercheur> findByChercheurNumeroMatricule(String numeroMatricule){
        return enjeuxIrdChercheurDao.findByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        @Transactional
        public int deleteByChercheurNumeroMatricule(String numeroMatricule){
        return enjeuxIrdChercheurDao.deleteByChercheurNumeroMatricule(numeroMatricule);
        }

        @Override
        public List<EnjeuxIrdChercheur> findByChercheurId(Long id){
        return enjeuxIrdChercheurDao.findByChercheurId(id);
        }

        @Override
        @Transactional
        public int deleteByChercheurId(Long id){
        return enjeuxIrdChercheurDao.deleteByChercheurId(id);
        }


@Override
public EnjeuxIrdChercheur findById(Long id){
if(id==null) return null;
return enjeuxIrdChercheurDao.getOne(id);
}

@Override
public EnjeuxIrdChercheur findByIdWithAssociatedList(Long id){
    return findById(id);
}



@Transactional
public int deleteById(Long id){
int res=0;
if(enjeuxIrdChercheurDao.findById(id).isPresent())  {
enjeuxIrdChercheurDao.deleteById(id);
res = 1;
}
return res;
}


@Override
public EnjeuxIrdChercheur update(EnjeuxIrdChercheur enjeuxIrdChercheur){
EnjeuxIrdChercheur foundedEnjeuxIrdChercheur = findById(enjeuxIrdChercheur.getId());
if(foundedEnjeuxIrdChercheur==null) return null;
else{
    archivableService.prepare(enjeuxIrdChercheur);
return  enjeuxIrdChercheurDao.save(enjeuxIrdChercheur);
}
}
    private void prepareSave(EnjeuxIrdChercheur enjeuxIrdChercheur){
        enjeuxIrdChercheur.setDateCreation(new Date());
                    if(enjeuxIrdChercheur.getArchive() == null)
                enjeuxIrdChercheur.setArchive(false);
                    if(enjeuxIrdChercheur.getAdmin() == null)
                enjeuxIrdChercheur.setAdmin(false);
                    if(enjeuxIrdChercheur.getVisible() == null)
                enjeuxIrdChercheur.setVisible(false);

            enjeuxIrdChercheur.setAdmin(false);
            enjeuxIrdChercheur.setVisible(false);
            User currentUser = SecurityUtil.getCurrentUser();
            if (currentUser != null && StringUtil.isNotEmpty(currentUser.getUsername())){
            enjeuxIrdChercheur.setUsername(currentUser.getUsername());
            }


    }

@Override
public EnjeuxIrdChercheur save (EnjeuxIrdChercheur enjeuxIrdChercheur){
    prepareSave(enjeuxIrdChercheur);



    findEnjeuxIrd(enjeuxIrdChercheur);
    findChercheur(enjeuxIrdChercheur);

    return enjeuxIrdChercheurDao.save(enjeuxIrdChercheur);


}

@Override
public List<EnjeuxIrdChercheur> save(List<EnjeuxIrdChercheur> enjeuxIrdChercheurs){
List<EnjeuxIrdChercheur> list = new ArrayList<>();
for(EnjeuxIrdChercheur enjeuxIrdChercheur: enjeuxIrdChercheurs){
list.add(save(enjeuxIrdChercheur));
}
return list;
}



@Override
@Transactional
public int delete(EnjeuxIrdChercheur enjeuxIrdChercheur){
    if(enjeuxIrdChercheur.getId()==null) return -1;
    EnjeuxIrdChercheur foundedEnjeuxIrdChercheur = findById(enjeuxIrdChercheur.getId());
    if(foundedEnjeuxIrdChercheur==null) return -1;
enjeuxIrdChercheurDao.delete(foundedEnjeuxIrdChercheur);
return 1;
}


public List<EnjeuxIrdChercheur> findByCriteria(EnjeuxIrdChercheurVo enjeuxIrdChercheurVo){

String query = "SELECT o FROM EnjeuxIrdChercheur o where 1=1 ";

            query += SearchUtil.addConstraint( "o", "id","=",enjeuxIrdChercheurVo.getId());
            query += SearchUtil.addConstraint( "o", "archive","=",enjeuxIrdChercheurVo.getArchive());
        query += SearchUtil.addConstraintDate( "o", "dateArchivage","=",enjeuxIrdChercheurVo.getDateArchivage());
        query += SearchUtil.addConstraintDate( "o", "dateCreation","=",enjeuxIrdChercheurVo.getDateCreation());
            query += SearchUtil.addConstraint( "o", "admin","=",enjeuxIrdChercheurVo.getAdmin());
            query += SearchUtil.addConstraint( "o", "visible","=",enjeuxIrdChercheurVo.getVisible());
            query += SearchUtil.addConstraint( "o", "username","LIKE",enjeuxIrdChercheurVo.getUsername());
            query += SearchUtil.addConstraintMinMaxDate("o","dateArchivage",enjeuxIrdChercheurVo.getDateArchivageMin(),enjeuxIrdChercheurVo.getDateArchivageMax());
            query += SearchUtil.addConstraintMinMaxDate("o","dateCreation",enjeuxIrdChercheurVo.getDateCreationMin(),enjeuxIrdChercheurVo.getDateCreationMax());
    if(enjeuxIrdChercheurVo.getEnjeuxIrdVo()!=null){
        query += SearchUtil.addConstraint( "o", "enjeuxIrd.id","=",enjeuxIrdChercheurVo.getEnjeuxIrdVo().getId());
            query += SearchUtil.addConstraint( "o", "enjeuxIrd.code","LIKE",enjeuxIrdChercheurVo.getEnjeuxIrdVo().getCode());
    }

    if(enjeuxIrdChercheurVo.getChercheurVo()!=null){
        query += SearchUtil.addConstraint( "o", "chercheur.id","=",enjeuxIrdChercheurVo.getChercheurVo().getId());
            query += SearchUtil.addConstraint( "o", "chercheur.numeroMatricule","LIKE",enjeuxIrdChercheurVo.getChercheurVo().getNumeroMatricule());
    }

return entityManager.createQuery(query).getResultList();
}

    private void findEnjeuxIrd(EnjeuxIrdChercheur enjeuxIrdChercheur){
        EnjeuxIrd loadedEnjeuxIrd =enjeuxIrdService.findByIdOrCode(enjeuxIrdChercheur.getEnjeuxIrd());

    if(loadedEnjeuxIrd==null ) {
    return;
    }
    enjeuxIrdChercheur.setEnjeuxIrd(loadedEnjeuxIrd);
    }
    private void findChercheur(EnjeuxIrdChercheur enjeuxIrdChercheur){
        Chercheur loadedChercheur =chercheurService.findByIdOrNumeroMatricule(enjeuxIrdChercheur.getChercheur());

    if(loadedChercheur==null ) {
    return;
    }
    enjeuxIrdChercheur.setChercheur(loadedChercheur);
    }

@Override
@Transactional
public void delete(List<EnjeuxIrdChercheur> enjeuxIrdChercheurs){
if(ListUtil.isNotEmpty(enjeuxIrdChercheurs)){
enjeuxIrdChercheurs.forEach(e->enjeuxIrdChercheurDao.delete(e));
}
}
@Override
public void update(List<EnjeuxIrdChercheur> enjeuxIrdChercheurs){
if(ListUtil.isNotEmpty(enjeuxIrdChercheurs)){
enjeuxIrdChercheurs.forEach(e->enjeuxIrdChercheurDao.save(e));
}
}




        public List<EnjeuxIrdChercheur> findAllNonArchive(){
        String query = "SELECT o FROM EnjeuxIrdChercheur o  WHERE o.archive != true AND o.visible = true";
        return entityManager.createQuery(query).getResultList();
        }

        public List<EnjeuxIrdChercheur> findAllByOwner(){
        List<EnjeuxIrdChercheur> result= new ArrayList();
        User currentUser = SecurityUtil.getCurrentUser();
        if (currentUser != null && StringUtil.isNotEmpty(currentUser.getUsername())){
        String query = "SELECT o FROM EnjeuxIrdChercheur o  WHERE o.archive != true AND o.visible = false AND o.username = '"+ currentUser.getUsername()+"'";
        result = entityManager.createQuery(query).getResultList();
        }
        return result;
        }



    }
