<template>
  <li :class="['menu-item-li', className]">
    <router-link class="menu-link" v-if="onlyOneChildren()" :to="item.path">
      {{ onlyItem.meta.title }}
    </router-link>
    <template v-else>
      <router-link class="menu-link" v-if="item.meta" :to="item.path">
        {{ item.meta.title }}</router-link
      >
      <ul class="menu-item-ul sub-menu-item">
        <menuItem
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          className="sub-menu-item"
        >
        </menuItem>
      </ul>
    </template>
  </li>
</template>

<script>
export default {
  name: 'menuItem',
  props: {
    item: { type: Object, required: true },
    className: { type: String, default: () => "menu-item" }
  },
  data() {
    return {
      onlyItem: null,
    }
  },
  methods: {
    onlyOneChildren() {
      let { redirect, children } = this.item;
      if (!children) {
        this.onlyItem = this.item
        return true;
      }
      else if (Array.isArray(children)) {
        let toChildren = children.filter(item => (!item.hidden));
        if (toChildren.length == 1 && redirect && (!toChildren.children || toChildren.children.length == 1)) {
          this.onlyItem = toChildren[0]
          return true;
        }
      }
      return false;
    }
  }
}
</script>

<style>
</style>