const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  user: state => state.auth.user,
  accessToken: state => state.auth.accessToken,
  refreshToken: state => state.auth.refreshToken,
  myPowerMenus: state => state.user.myPowerMenus,
  myPowerOperations: state => state.user.myPowerOperations,
  myRoutes: state => state.router.myRoutes,
  routerLoading: state => state.router.loading,
  onlineUserSocketIds: state => state.socket.onlineUserSocketIds,
  unreadNotifications: state => state.notification.unreadNotifications
}
export default getters
