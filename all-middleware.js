module.exports = function (options) {
    return function(req,res,next){
        console.log("external middleware working");
        next();
}}
    