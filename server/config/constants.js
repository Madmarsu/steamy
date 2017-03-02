const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {
  user: {
    name: 'User',
    endpoint: 'users'
  },
  group: {
    name: 'Group',
    endpoint: 'groups'
  }
}


export  {
  actions,
  models
}