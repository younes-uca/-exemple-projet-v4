package com.ird.faa.bean;

import java.util.Objects;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;


import javax.persistence.*;



@Entity
@Table(name = "discipline_scientifique_erc")
public class DisciplineScientifiqueErc    implements Archivable  {

@Id
    @SequenceGenerator(name="discipline_scientifique_erc_seq",sequenceName="discipline_scientifique_erc_seq",
    allocationSize=1, initialValue = 10000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="discipline_scientifique_erc_seq")
private Long id;

            @Column(length = 500)
            private String libelleFr;
            @Column(length = 500)
            private String libelleEng;
            @Column(length = 500)
            private String code;
            private Long niveau ;
            @Column(columnDefinition = "boolean default false")
                 private Boolean archive = false;
            @JsonFormat(pattern="yyyy-MM-dd")
            @Temporal(TemporalType.DATE)
            private Date dateArchivage ;
            @JsonFormat(pattern="yyyy-MM-dd")
            @Temporal(TemporalType.DATE)
            private Date dateCreation ;

    @ManyToOne
    private DisciplineScientifiqueErcParent disciplineScientifiqueErcParent ;


public DisciplineScientifiqueErc(){
super();
}


            public Long getId(){
            return this.id;
            }
            public void setId(Long id){
            this.id = id;
            }
            public String getLibelleFr(){
            return this.libelleFr;
            }
            public void setLibelleFr(String libelleFr){
            this.libelleFr = libelleFr;
            }
            public String getLibelleEng(){
            return this.libelleEng;
            }
            public void setLibelleEng(String libelleEng){
            this.libelleEng = libelleEng;
            }
            public String getCode(){
            return this.code;
            }
            public void setCode(String code){
            this.code = code;
            }
            public Long getNiveau(){
            return this.niveau;
            }
            public void setNiveau(Long niveau){
            this.niveau = niveau;
            }
            public DisciplineScientifiqueErcParent getDisciplineScientifiqueErcParent(){
            return this.disciplineScientifiqueErcParent;
            }
            public void setDisciplineScientifiqueErcParent(DisciplineScientifiqueErcParent disciplineScientifiqueErcParent){
            this.disciplineScientifiqueErcParent = disciplineScientifiqueErcParent;
            }
        public Boolean  getArchive(){
        return this.archive;
        }
        public void setArchive(Boolean archive){
        this.archive = archive;
        }
            public Date getDateArchivage(){
            return this.dateArchivage;
            }
            public void setDateArchivage(Date dateArchivage){
            this.dateArchivage = dateArchivage;
            }
            public Date getDateCreation(){
            return this.dateCreation;
            }
            public void setDateCreation(Date dateCreation){
            this.dateCreation = dateCreation;
            }

        @Override
        public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DisciplineScientifiqueErc disciplineScientifiqueErc = (DisciplineScientifiqueErc) o;
        return id != null && id.equals(disciplineScientifiqueErc.id);
        }

        @Override
        public int hashCode() {
        return Objects.hash(id);
        }

}

