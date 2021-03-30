const express = require("express");
const suiviExposants = express.Router();

const SuiviDiscussion = require('../models/Suivi_discussion')
const SuiviExposant = require('../models/Suivi_exposant')
const {Op} = require("sequelize");


suiviExposants.get("/getDiscussions", (req, res) => {

    SuiviDiscussion.findAll({
            attributes: ["suivD_id", "suivD_libelle"]
        }
    ).then((result) => {
        console.log("UPDATE", result)
        res.json(result)
    })
})


suiviExposants.put("/updateWorkflow", (req, res) => {
    console.log("REQ", req.body)

    SuiviExposant.update(
        {
            suivD_id: req.sanitize(parseInt(req.body.suivD_id)),
        },
        {
            where: {
                suivE_id: req.sanitize(req.body.suivE_id)
            }
        }
    ).then((result) => {
        console.log("RESULT", result)
        if (result == 0) {
            res.send({message: "UPDATE failed"})
        } else {
            res.send({message: "UPDATE success"})
        }
    })
})


suiviExposants.put('/setAllAbsent', (req, res) => {

    SuiviExposant.update(
        {
            suivD_id: 5
        },
        {
            where: {
                suivE_dateContact1: {
                    [Op.ne]: null
                },
                suivE_dateContact2: {
                    [Op.ne]: null
                },
                suivE_dateContact3: {
                    [Op.ne]: null
                },
            }
        }
    ).then((result) => {
        res.send({message: result})
    }).catch((err) => {
        console.log(err)
    })
})


suiviExposants.put("/updateBenevole", (req, res) => {
    SuiviExposant.update(
        {
            suivE_benevole: parseInt(req.sanitize(req.body.suivE_benevole))
        },
        {
            where: {
                suivE_id: parseInt(req.sanitize(req.body.suivE_id))
            }
        }
    ).then((response => {
        console.log("UPDATE", response)
        res.send({message: "Update success"})
    })).catch((err) => {
        console.log(err)
    })
})

//changer la valeur du déplacement
/*
suiviExposants.put("/updateSeDeplace", (req, res) => {
    console.log("JE SUIS LAAAAAAA")
    console.log("DEPLACEMENT",req.body.suivE_deplacement)
    console.log("PARSE INT DEPLACEMENT",parseInt(req.sanitize(req.body.suivE_deplacement)))
    if(!req.body.suivE_deplacement){ //-> si il ne vient pas il a besoin de bénévols
        SuiviExposant.update(
            {
                suivE_deplacement: parseInt(req.sanitize(req.body.suivE_deplacement)),
                suivE_benevole : 1
            },
            {
                where: {
                    suivE_id: parseInt(req.sanitize(req.body.suivE_id))
                }
            }
        ).then((response => {
            console.log("UPDATE", response)
            res.send({message: "Update success"})
        })).catch((err) => {
            console.log(err)
        })
    }else{
        SuiviExposant.update(
            {
                suivE_deplacement: parseInt(req.sanitize(req.body.suivE_deplacement))
            },
            {
                where: {
                    suivE_id: parseInt(req.sanitize(req.body.suivE_id))
                }
            }
        ).then((response => {
            console.log("UPDATE", response)
            res.send({message: "Update success"})
        })).catch((err) => {
            console.log(err)
        })
    }

})
*/
suiviExposants.put("/updateSeDeplace", (req, res) => {
    console.log("DEPLACE", req.body.suivE_deplacement)
    console.log("WHOOOOOO", req.body.suivE_id)
    SuiviExposant.update(
        {
            suivE_deplacement: parseInt(req.sanitize(req.body.suivE_deplacement))
        },
        {
            where: {
                suivE_id: parseInt(req.sanitize(req.body.suivE_id))
            }
        }
    ).then((response => {
        console.log("UPDATE", response)
        res.send({message: "Update success"})
    })).catch((err) => {
        console.log(err)
    })
})


suiviExposants.put("/updateNbBenevole", (req, res) => {
    SuiviExposant.update(
        {
            suivE_nbBenevoles: parseInt(req.sanitize(req.body.suivE_nbBenevoles))
        },
        {
            where: {
                suivE_id: parseInt(req.sanitize(req.body.suivE_id))
            }
        }
    ).then((response => {
        console.log("UPDATE", response)
        res.send({message: "Update success"})
    })).catch((err) => {
        console.log(err)
    })
})


suiviExposants.put("/updateDateContact/:numeroRelance", (req, res) => {
    let colonne = "";

    switch (req.params.numeroRelance) {
        case "1":
            colonne = "suivE_dateContact1";
            break;
        case "2":
            colonne = "suivE_dateContact2";
            break;
        case "3":
            colonne = "suivE_dateContact3";
            break;
        default:
            res.send({message: "Requete impossible"})
            return
    }

    SuiviExposant.update(
        {
            [colonne]: req.sanitize(req.body.suivE_dateContact)
        },
        {
            where: {
                suivE_id: req.sanitize(req.body.suivE_id)
            }
        }
    ).then((response) => {
        //console.log(response)
        res.send({message: 'Update réussi'})
    })
})

//changer le commentaire
suiviExposants.post('/:soc_id/update-commentaire', (req,res) => {

    SuiviExposant.update(
                    {
                        suivE_commentaire: req.body.suivE_commentaire, //j'utilize pas sanitize sinon il transforme mon booléen en undefine..
                    },
                    {
                        where: {
                            soc_id: req.sanitize(req.params.soc_id),
                            fes_id: req.sanitize(req.body.fes_id)
                        }
                    }
                ).then(() => {
                    res.json({success: "Commentaire changé!"})
                })
                    .catch((err) => {
                        res.json({error: err});
                    });

})



module.exports = suiviExposants;
