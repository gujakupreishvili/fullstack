const {Router} = require("express")
const userRouter = require("./routes/rout")

const apiRouter = Router()

apiRouter.use("/users",userRouter)
module.exports=apiRouter