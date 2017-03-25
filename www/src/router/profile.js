import MainPage from "@/components/profile/MainPage"
import Edit from "@/components/profile/Edit"
export default [{
  path: '/profile/:id',
  name: 'Profile',
  component: MainPage,
  children: [{
    path: 'edit',
    name: "profileEdit",
    component: Edit,
    beforeEnter: (to, from, next) => {
      if (to.params.id != "") {
        
        next(false)
        return
      }
      next()
    }
  }]
}]
