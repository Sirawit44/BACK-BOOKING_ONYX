const prisma = require("../models/prisma");

const authService = {}

authService.createUser = (data) => prisma.users.create({data})

authService.findUserByEmail = (email) => prisma.users.findFirst({
  where: {
    email: email
  },

});

authService.findUserById = (userId) => prisma.users.findFirst({
  where:{
    id: userId
  }
})

module.exports = authService;

