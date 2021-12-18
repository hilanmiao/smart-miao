import { isEmpty, join, findIndex, uniq } from 'lodash'

/**
 * power operation mixin
 */
export default {
  methods: {
    /**
     * 逗号分隔权限
     * @param {String} perms 例如 system:user:add,system:user:update
     * @returns 权限数组
     */
    splitPerms(perms) {
      if (perms) {
        const permsArray = perms.split(',')
        if (permsArray && permsArray.length > 0) {
          return permsArray
        }
      }
      return []
    },
    joinPerms(perms) {
      if (isEmpty(perms)) {
        return ''
      }
      const arr = perms.map(e => {
        return join(e, ':')
      })
      return join(arr, ',')
    },
    /**
     * 遍历获取$service下定义的权限的值并合并到一个数组后返回
     * 例如： [ 'system:user:add', 'system:menu:add', .... ]
     */
    flatPerms() {
      let perms = []
      Object.keys(this.$permission).forEach(key => {
        const module = this.$permission[key]
        perms = perms.concat([Object.keys(module).map(e => module[e])].flat())
      })
      const d = uniq(perms).filter(e => e.includes(':')).map(e => e.split(':'))
      return d
    },
    /**
     * 将权限渲染到级联选择器
     * @param {Number} start 起始
     * @param {Array} arr 单个权限数组
     * @param {Array} op options
     */
    filterPermToCascader(start, arr, op) {
      const key = arr[start]
      const index = findIndex(op, e => e.label === key)
      if (index >= 0) {
        // 存在则继续遍历
        this.filterPermToCascader(start + 1, arr, op[index].children)
      } else {
        // 是否为最后一个
        const isLast = start === arr.length - 1
        const value = {
          value: key,
          label: key,
          children: isLast ? null : []
        }
        if (op) {
          op.push(value)
        }
        if (!isLast) {
          this.filterPermToCascader(start + 1, arr, op[op.length - 1].children)
        }
      }
    },
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
        if (!parentMenu && !menu.parentId && menu.type === '1') {
          // 根菜单，查找该跟菜单下子菜单，因为可能会包含权限
          const childMenu = this.filterMenuToTable(menus, menu)
          realMenu = { ...menu }
          realMenu.children = childMenu
        } else if (!parentMenu && !menu.parentId && menu.type === '0') {
          // 根目录
          const childMenu = this.filterMenuToTable(menus, menu)
          realMenu = { ...menu }
          realMenu.children = childMenu
        } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === '1') {
          // 子菜单下继续找是否有子菜单
          const childMenu = this.filterMenuToTable(menus, menu)
          realMenu = { ...menu }
          realMenu.children = childMenu
        } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === '0') {
          // 如果还是目录，继续递归
          const childMenu = this.filterMenuToTable(menus, menu)
          realMenu = { ...menu }
          realMenu.children = childMenu
        } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === '2') {
          realMenu = { ...menu }
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
        if (menu.type === '2') {
          // 权限直接return
          return
        }
        if (!parentMenu && !menu.parentId && menu.type === '1') {
          // 根菜单
          node = { label: menu.name }
        } else if (!parentMenu && !menu.parentId && menu.type === '0') {
          // 根目录
          const childNode = this.filterMenuToTree(menus, menu)
          node = { label: menu.name }
          node.children = childNode
        } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === '1') {
          // 子菜单则停止
          node = { label: menu.name }
        } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === '0') {
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
    },
    /**
     * 渲染菜单至树形控件
     */
    filterMenuHasPermsToTree(menus, parentMenu) {
      const res = []
      menus.forEach(menu => {
        let node
        if (!parentMenu && !menu.parentId && menu.type === '1') {
          // 根菜单
          const childNode = this.filterMenuHasPermsToTree(menus, menu)
          node = { label: menu.name }
          node.children = childNode
        } else if (!parentMenu && !menu.parentId && menu.type === '0') {
          // 根目录
          const childNode = this.filterMenuHasPermsToTree(menus, menu)
          node = { label: menu.name }
          node.children = childNode
        } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === '1') {
          // 子菜单则停止
          const childNode = this.filterMenuHasPermsToTree(menus, menu)
          node = { label: menu.name }
          node.children = childNode
        } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === '0') {
          // 如果还是目录，继续递归
          const childNode = this.filterMenuHasPermsToTree(menus, menu)
          node = { label: menu.name }
          node.children = childNode
        } else if (parentMenu && parentMenu.id === menu.parentId && menu.type === '2') {
          // 权限停止递归
          node = { label: menu.name }
        }

        if (node) {
          node.id = menu.id
          res.push(node)
        }
      })
      return res
    },
    /**
     * 渲染部门列表至树形控件
     * @param {Array} depts list
     * @param {Object} parentDept parent dept obj
     */
    filterDeptToTree(depts, parentDept) {
      const res = []
      depts.forEach(dept => {
        let node
        if (!parentDept && !dept.parentId) {
          // 根菜单
          const childNode = this.filterDeptToTree(depts, dept)
          node = { label: dept.name }
          node.children = childNode
        } else if (parentDept && parentDept.id === dept.parentId) {
          const childNode = this.filterDeptToTree(depts, dept)
          node = { label: dept.name }
          node.children = childNode
        }
        if (node) {
          node.id = dept.id
          res.push(node)
        }
      })
      return res
    }
  }
}
