<template>
  <div v-if="!isHidden">
    <template v-if="hasOneShowingChild(item) && onlyOneChild">
      <router-link :to="resolvePath(onlyOneChild.path)">
        <MenuItem :index="resolvePath(onlyOneChild.path)">
        <i :class="onlyOneChild.meta.icon"></i>
        <span slot="title">{{ menuText(onlyOneChild) }}</span>
        </MenuItem>
      </router-link>
    </template>

    <Submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ menuText(item) }}</span>
      </template>
      <sidebar-item v-for="child in item[defaultProp.children]" :key="child[defaultProp.path]" :item="child"
        :base-path="resolvePath(child.path)" :defaultProp="defaultProp" :menuPool="menuPool" :internation="internation"
        class="nest-menu" />
    </Submenu>
  </div>
</template>

<script>
import { Submenu, MenuItem } from "element-ui";
import path from "path";
export default {
  name: "SidebarItem",
  components: { Submenu, MenuItem },
  props: {
    item: { type: Object, required: true },
    basePath: { type: String, default: "" },
    defaultProp: { type: Object, default: () => ({}) }, // 字段映射关系
    menuPool: { type: Array, default: () => [] },
    internation: { type: Boolean, default: false, } // 是否国际化
  },
  mounted() {
    this.menuPool.push(this.item);
  },
  computed: {
    isHidden() {
      const { hidden } = this.defaultProp;
      let menuHidden = this.deepPick(hidden.split("."), this.item);
      if (menuHidden == true) return true;
      return false;
    },
  },
  methods: {
    hasOneShowingChild(item) {
      let menuChildren = item[this.defaultProp.children];
      if (
        menuChildren &&
        Array.isArray(menuChildren) &&
        menuChildren.length == 1
      ) {
        this.onlyOneChild = menuChildren[0];
        return true;
      }

      if (!menuChildren) {
        this.onlyOneChild = { ...item };
        return true;
      }

      return false;
    },
    deepPick(keys = [], obj) {
      let pickObj = null;
      if (keys.length == 0 || !keys[0]) return obj;
      keys.map((key, index) => {
        pickObj = obj[key];
        if (pickObj && keys.length != index + 1) obj = pickObj;
      });
      return pickObj;
    },
    resolvePath(routePath) {
      if (this.basePath.indexOf(routePath) != -1) return this.basePath;
      return path.resolve(this.basePath, routePath);
    },
    menuText(menu) {
      const title = this.deepPick(this.defaultProp.title.split("."), menu);
      return this.internation ? this.$t(title) : title
    },
  },
  data() {
    return {
      onlyOneChild: null,
    };
  },
};
</script>

<style lang="scss"></style>