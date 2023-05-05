const PatientModel=require('../model/PatientModel')
const controllerError = require("../utils/controllerError");
module.exports.getPatient__controller=async (req,res,next)=>{
    try {
        const patientInfo=await PatientModel.find()
        return res.status(200).json({
            patientInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}
module.exports.Patient__register__controller = async (req, res, next) => {
    try {
      
      const { patientName, age, gender, contactInfo } = req.body;
  
      const patientInfo = await PatientModel.findOne({ contactInfo });
  
      if (patientInfo) {
        return res.status(401).json({
          errors: { user: "User already exists" },
        });
      }
      
      const user = new PatientModel({
        patientName,
        age,
        gender,
        contactInfo,
      });
  
      user
        .save()
        .then((userData) => {
          res.status(201).json({
            userData,
          });
        })
        .catch((err) => {
          controllerError(err, res, "Error occurred");
        });
    } catch (error) {
      controllerError(error, res, "Error occurred");
    }
  };
  
module.exports.deletePatient__controller = async (req, res, next) => {
  try {
    console.log("hello");
    const userId = req.params.id;
    const user = await PatientModel.findOneAndDelete({ _id: userId });
    return res.status(200).json({
      user,
      message: "patient deleted succesfully"
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports.PatientEdit__controller =async (req,res,next) => {
  const{_id,patientName,age,gender,contactInfo}=req.body;
  const userinfo= await PatientModel.findOne({contactInfo});
  if(userinfo&&userinfo._id!=_id){
      return res.status(401).json({
          errors:{user: "patient already exist"},
      });
  }

  
  const User= await PatientModel.findByIdAndUpdate(_id,{
    
      patientName:patientName,
      age:age,
      gender:gender,
      contactInfo:contactInfo,

  })
  .then((user)=>{
    
      return res.status(200).json({
          user,
          message: "Patient updated successfully"
          
      });
  }).catch((err)=>{
      return res.status(400).json({
          error:"error occured"
      });
  });
}