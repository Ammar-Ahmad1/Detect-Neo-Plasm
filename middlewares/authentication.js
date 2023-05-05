module.exports.adminAuthentication = (req, res, next) => {
    if(req.user.role!== "Admin"){
        return res.status(401).json({
            err:"Access Denied"
        })
    }
    next()
}
module.exports.staffAuthentication = (req, res, next) => {
    if(req.user.role!== "Staff"){
        return res.status(401).json({
            err:"Access Denied"
        })
    }
    next()
}
module.exports.receptionistAuthentication = (req, res, next) => {
    if(req.user.role!== "Receptionist"){
        return res.status(401).json({
            err:"Access Denied"
        })
    }
    next()
}
