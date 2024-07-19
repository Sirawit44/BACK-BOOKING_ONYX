const notFound = (req,res,next)=>{
  res.status(404).json({message : `requested URL: ${req.method} ${req.url} was not found on this server`})
}

module.exports = notFound;