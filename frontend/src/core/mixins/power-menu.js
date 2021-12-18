/**
 * power menu mixin
 */
export default {
  methods: {
    /**
     * 渲染菜单至表格
     * @param {Array} menus 所有菜单
     * @param {Object} parentMenu 父级菜单
     */
    filterMenuToTable(menus, parentMenu) {
      const res = []
      menus.forEach(menu => {
        // 根级别菜单渲染
        let realMenu
        if (!parentMenu && !menu.parentId && menu.type === 'menu') {
          // 根菜单，查找该跟菜单下子菜单，因为可能会包含权限
          const childMenu = this.filterMenuToTable(menus, menu)
          realMenu = { ...menu }
          realMenu.children = childMenu
        } else if (!parentMenu && !menu.parentId && menu.type === 'directory') {
          // 根目录
          const childMenu = this.filterMenuToTable(menus, menu)
          realMenu = { ...menu }
          realMenu.children = childMenu
        } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === 'menu') {
          // 子菜单下继续找是否有子菜单
          const childMenu = this.filterMenuToTable(menus, menu)
          realMenu = { ...menu }
          realMenu.children = childMenu
        } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === 'directory') {
          // 如果还是目录，继续递归
          const childMenu = this.filterMenuToTable(menus, menu)
          realMenu = { ...menu }
          realMenu.children = childMenu
        }
        // add curent route
        if (realMenu) {
          realMenu.pid = menu.id
          res.push(realMenu)
        }
      })
      return res
    },

    /**
     * 渲染菜单至树形控件
     * @param {Array} menus 所有菜单
     * @param {Object} parentMenu 父级菜单
     */
    filterMenuToTree(menus, parentMenu) {
      const res = []
      menus.forEach(menu => {
        let node
        if (!parentMenu && !menu.parentId && menu.type === 'menu') {
          // 根菜单
          node = { label: menu.name }
        } else if (!parentMenu && !menu.parentId && menu.type === 'directory') {
          // 根目录
          const childNode = this.filterMenuToTree(menus, menu)
          node = { label: menu.name }
          node.children = childNode
        } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === 'menu') {
          // 子菜单则停止
          node = { label: menu.name }
        } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === 'directory') {
          // 如果还是目录，继续递归
          const childNode = this.filterMenuToTree(menus, menu)
          node = { label: menu.name }
          node.children = childNode
        }

        if (node) {
          node.id = menu.id
          res.push(node)
        }
      })
      return res
    }
  }
}
