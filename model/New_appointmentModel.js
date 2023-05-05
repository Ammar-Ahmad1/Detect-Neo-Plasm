const mongoose=require('mongoose')


const New_appointmentSchema= mongoose.Schema({
    patientContactno: {
        type: String,
        
    },
    age: {
        type: String,
    
    },
    gender: {
        type: String,
    },
    patient_name:
    {
        type: String,
    },
    doctor_Id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    doctor_name:
    {
        type: String,
    },
    date_Time:
    {
        type: Date,
    }
   
},{timestamps: true})

const New_appointmentModel=mongoose.model("newAppointment", New_appointmentSchema)

module.exports=New_appointmentModel