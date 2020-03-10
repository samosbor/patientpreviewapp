/* eslint-disable */
import { getInstance } from './index'

export const authGuard = (to, from, next) => {
  const authService = getInstance()
  const fn = () => {
    // If the user is authenticated, continue with the route
    if (authService.isAuthenticated) {
      if (!authService.user.app_metadata || authService.user.app_metadata.access === 'no_access') {
        location.replace('https://www.patientpreviewapp.com/signup');  
      }
      return next()
    }
    // Otherwise, log in
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } })
  }

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.loading) {
    return fn()
  }

  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch('loading', loading => {
    if (loading === false) {
      return fn()
    }
  })
}
