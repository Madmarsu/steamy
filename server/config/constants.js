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
    endpoint: 'users',
    useCustomRoutes: true
  },
  group: {
    name: 'Group',
    endpoint: 'groups',
    useCustomRoutes: true
  },
  chat: {
    name: 'Chat',
    endpoint: 'chats',
    useCustomRoutes: true
  }
}


export  {
  actions,
  models
}