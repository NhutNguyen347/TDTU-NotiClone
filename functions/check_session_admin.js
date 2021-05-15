var express = require('express')
var session = require('express-session')

function check_session_admin(req){
    var session = 0

    if(req.session.userId && req.session.userRole == 2){
        session = 1
	}
    else{
        session = 0
    }

    return session
}

module.exports = check_session_admin