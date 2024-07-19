const prisma = require("../models/prisma");

const branchService = {};

branchService.createBranch = (data) => prisma.branch.create({data});

branchService.findBranchByName = (name) => prisma.branch.findFirst({
  where : {name : name}
});


branchService.getAllBranch = ()=> prisma.branch.findMany({});

branchService.updateBranchById = (data, branchId) => prisma.branch.update({
  where:{
    id: branchId
  },
  data : data
});



module.exports = branchService;