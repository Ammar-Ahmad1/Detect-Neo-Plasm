const UserModel=require('../model/UserModel')
const PatientModel=require('../model/PatientModel')
const bcrypt = require("bcryptjs");
const New_appointmentModel = require('../model/New_appointmentModel');
const controllerError = require("../utils/controllerError");

module.exports.getStaff__controller=async (req,res,next)=>{
    try {
        const staffInfo=await UserModel.find({role:"Staff"})
        return res.status(200).json({
            staffInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}
module.exports.getRadiologist__controller=async (req,res,next)=>{
    try {
        const RadiologistInfo=await UserModel.find({role:"Radiologist"})
        return res.status(200).json({
            RadiologistInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}
module.exports.getDoctor__controller=async (req,res,next)=>{
    try {
        const doctorInfo=await UserModel.find({role:"Doctor"})
        return res.status(200).json({
            doctorInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}

module.exports.getuserbyid__controller=async (req,res,next)=>{
    try {
        const id=req.params.id
        console.log(di)
        const userInfo=await UserModel.findById({_id:id})
        return res.status(200).json({
            userInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}

module.exports.getReceptionist__controller=async (req,res,next)=>{
    try {
        const receptionistInfo=await UserModel.find({role:"Receptionist"})
        return res.status(200).json({
            receptionistInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}


module.exports.delete__controller = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await UserModel.findOneAndDelete({ _id: userId });
      return res.status(200).json({
        user,
        message: "user deleted succesfully"
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  };
  
  module.exports.edit_profile =async (req,res,next) => {
    const{_id,userName,email,password}=req.body;
    const userinfo= await UserModel.findOne({email});
    if(userinfo&&userinfo._id!=_id){ 
        return res.status(401).json({
            errors:{user: "user already exist"},
        });
    }
    const hash = await bcrypt.hash(password, 10);
    
    const User= await UserModel.findByIdAndUpdate(_id,{
        userName:userName,
        email:email,
        password:hash,

    })
    .then((user)=>{
        return res.status(200).json({
            user,
            message: "user updated successfully"
        });
    }).catch((err)=>{
        return res.status(400).json({
            error:"error occured"
        });
    });
  }

//***********NEw Appointment controller************8
module.exports.AddNewAppointment = async (req, res, next) => {
    try {
      const patient_Info = await PatientModel.find({ contactInfo: req.body.mobileNo });
      const staff_Info = await UserModel.find({ _id: req.body.doctor1 });
  
      if (staff_Info.length === 0) {
        // handle case when no staff info is found
        return res.status(404).json({ message: 'not found' });
      }
  
      const user = new New_appointmentModel({
        patientContactno: patient_Info[0].contactInfo,
        age: patient_Info[0].age,
        gender: patient_Info[0].gender,
        patient_name: patient_Info[0].patientName,
        doctor_Id: req.body.doctor1,
        doctor_name: staff_Info[0].userName,
        date_Time: req.body.dates,
      });
  
      const userData = await user.save();
      res.status(201).json({ userData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error occurred' });
    }
  };

module.exports.getappointment__controller_doctor=async (req,res,next)=>{
    try {
        const id= req.params.id
        console.log(req.params.id)
        const appointmentInfo=await New_appointmentModel.find({doctor_Id:id})
        return res.status(200).json({
            appointmentInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}

module.exports.getappointment__controller=async (req,res,next)=>{
    try {
        
        const AppointmentInfo=await New_appointmentModel.find({})
        return res.status(200).json({
            AppointmentInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}
module.exports.deleteappointment__controller = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await New_appointmentModel.findOneAndDelete({ _id: userId });
      return res.status(200).json({
        user,
        message: "user deleted succesfully"
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  };
  module.exports.searchbyname__controller=async (req, res) => {
    try {
        const query = req.query.query;
        const results = await New_appointmentModel.find({ doctor_name: { $regex: query, $options: 'i' }  });
        res.json(results);
        
      } catch (err) {
        console.log(err)        
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}

