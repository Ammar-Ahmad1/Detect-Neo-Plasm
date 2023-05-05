const {
  getStaff__controller,
  getReceptionist__controller,
  getRadiologist__controller,
  getDoctor__controller,
  delete__controller,
  edit_profile,
  AddNewAppointment,
  getappointment__controller_doctor,
  deleteappointment__controller,
  getappointment__controller,
  searchbyname__controller,
  getuserbyid__controller,
  handleTestImage
 
} = require("../controllers/userController");
const { adminAuthentication } = require("../middlewares/authentication");
const { staffAuthentication } = require("../middlewares/authentication");
const { requireLogin } = require("../middlewares/requireLogin");

const router = require("express").Router();

router.get(
  "/staff-manager",
  requireLogin,
  adminAuthentication,
  getStaff__controller
);

router.get(
  "/receptionist",
  requireLogin,
  staffAuthentication,
  getReceptionist__controller,
  
);
router.get(
"/userbyid/:id",
getuserbyid__controller

);
router.get(
  "/radiologist",
  // requireLogin,
  // staffAuthentication,
  getRadiologist__controller
);
router.get(
  "/doctor",
  // requireLogin,
  // staffAuthentication,
  getDoctor__controller
);

router.get(
  "/delete/:id",
  delete__controller
);
router.put(
  "/editStaff",
  edit_profile
)
// router.get(
//   '/search/:value',
//   Search_userbyname
// )
router.post(
  "/addNewAppointment",
  AddNewAppointment
)
router.get(
  "/getappointment/:id",
  getappointment__controller_doctor

)
router.get(
  "/getAppointment",
  getappointment__controller
)
router.get(
  "/deleteappointment/:id",
  deleteappointment__controller

)
router.get(
  "/getAppointment/searchby_name",
  getappointment__controller,
  searchbyname__controller
)
module.exports = router;

