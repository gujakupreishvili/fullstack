const {Router} = require("express")
const {getAllUSers, addNewUser, deleteUser, updateUser} = require("./rout.service")
const userRouter=Router()

userRouter.get("/", getAllUSers)
userRouter.post("/",addNewUser)
userRouter.delete("/:id",deleteUser)
userRouter.patch("/:id",updateUser)
module.exports=userRouter