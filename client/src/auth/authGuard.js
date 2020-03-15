import router from '../router/index'
import { store } from '../store/store'
import UserService from '../services/UserService'

export const authGuard = (to, from, next) => {
  console.log("AUTHGAURD")
  console.log($cookies.get("token"))
  // If the user is authenticated, continue with the route
  if ($cookies.get("token")) {
    // if (store.user === {}) {
    //   UserService.getUserData(accessToken, this.user.sub).then((result) => {
    //     store.user = result
    //   })
    // }
    return next()
  }
  // Otherwise, log in
  router.push('/login')
}