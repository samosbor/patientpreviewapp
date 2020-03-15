import router from '../router/index'
import { store } from '../store/store'
import UserService from '../services/UserService'

export const authGuard = async (to, from, next) => {
  console.log("AUTHGAURD")
  console.log($cookies.get("token"))
  // If the user is authenticated, continue with the route
  if ($cookies.get("token")) {
    if (Object.keys(store.user).length === 0) { // grab the user from db if we dont have it
      await UserService.getUserData($cookies.get("token")).then((result) => {
        console.log(result)
        store.user = result
      })
    }
    return next()
  }
  // Otherwise, log in
  router.push('/login')
}