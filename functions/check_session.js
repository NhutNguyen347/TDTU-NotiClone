var express = require('express')
var session = require('express-session')

function check_session(req){
    var session = 0

    if(req.session.userId && (req.session.userRole == 1 || req.session.userRole == 0)){
        session = 1
	}
    else{
        session = 0
    }

    return session
}

module.exports = check_session