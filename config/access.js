// Declared banned apis per role
// acces[key] = roles
// role[key] = endpoints
// endpoints[array] = restricted actions

const access = {
  admin: {},
  user: {
    users: ["find"],
    tasks: ["browse"],
  },
};

module.exports = access;
