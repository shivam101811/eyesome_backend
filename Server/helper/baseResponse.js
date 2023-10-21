function success(message,results, statusCode){
    return {
        message,
        error:false,
        code:statusCode,
        count:results.count,
        results
    };
}


function error(message, statusCode){
    return{
        message,
        code:statusCode,
        error:true
    };
}

module.exports = {success, error}