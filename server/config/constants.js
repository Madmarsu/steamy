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
  },
  message: {
    name: 'Message',
    endpoint: 'messages'
  }
}

const steam = {
  apiKey: "99B125DE809E1AA62AA914DB59F3B21F",
  returnURL: 'http://localhost:3000/steam/auth/return',
  realm: 'http://localhost:3000/'
}


export  {
  actions,
  models,
  steam
}