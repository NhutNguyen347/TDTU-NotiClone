/**
 * 
 * Input: Student's email 
 * Ouput: int value 1 - positive, 0 - negative 
 * Function: it will check if the student includes '@student.tdtu.edu.vn' or not
 */

function emailChecker(email){
    var result = 0

    var test = '@student.tdtu.edu.vn'

    if(email.includes(test, 8)){
        result = 1
    }

    return result
}

module.exports = emailChecker
