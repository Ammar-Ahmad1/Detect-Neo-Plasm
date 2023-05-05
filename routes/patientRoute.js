const {
    getPatient__controller,
    Patient__register__controller,
    deletePatient__controller,
    PatientEdit__controller
 

} = require("../controllers/patientController");


const router = require("express").Router();

router.get(
    "/getpatient",
    getPatient__controller,
 
)
router.get(
    "/getpatient/:id",
    deletePatient__controller,
    
)
router.put(
    "/editpatient",
   
 PatientEdit__controller,

)

router.post("/registerPatient", Patient__register__controller  )

module.exports = router;