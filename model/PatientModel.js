const mongoose=require('mongoose')


const patientSchema= mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contactInfo:
    {
        type: String,
        required: true
    }
   
},{timestamps: true})

const PatientModel=mongoose.model("Patient", patientSchema)

module.exports=PatientModel