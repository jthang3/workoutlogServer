module.exports = (req,res,next)=>{
    res.header("access-control-allow-origin","*");
    res.header("access-control-allow-methods","POST,PUT,GET,DELETE");
    res.header("access-control-allow-headers","Origin,X-Requested-Width,accept,Content-Type,Authorization");
    next();
}