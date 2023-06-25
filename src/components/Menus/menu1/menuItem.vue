<template>
  <li
    :class="[
      item.meta && item.meta.className == 'leftExpand'
        ? 'left-menu-item-li'
        : 'menu-item-li',
      className,
      {
        'left-menu-item-li': item.meta && item.meta.className == 'more',
      },
    ]"
  >
    <router-link
      class="menu-link"
      v-if="onlyOneChildren()"
      :to="resolvePath(onlyItem.path)"
    >
      <div
        :class="[
          className == 'menu-item' ? 'root-menu' : '',
          onlyItem.activeMenu ? 'active-menu' : '',
        ]"
        @click="onClickMenu(onlyItem)"
      >
        {{ onlyItem.meta.title }}
        <SvgBorder v-if="className == 'menu-item'"> </SvgBorder>
      </div>
    </router-link>
    <template v-else>
      <div
        v-if="item.meta"
        :class="[
          'menu-link',
          className == 'menu-item' ? 'root-menu' : '',
          item.activeMenu ? 'active-menu' : '',
        ]"
      >
        {{ item.meta.title }}
        <span
          :class="[
            'iconfont',
            'icon-arrow',
            className == 'menu-item' ? 'down-icon' : '',
          ]"
        ></span>
        <SvgBorder v-if="className == 'menu-item'"> </SvgBorder>
      </div>
      <ul class="menu-item-ul sub-menu-item">
        <menuItem
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          className="sub-menu-item"
          :menuSize="menuSize"
          :base-path="resolvePath(child.path)"
          @activeMenu="onActiveMenu"
        >
        </menuItem>
      </ul>
    </template>
  </li>
</template>

<script>
import path from "path";
import SvgBorder from "./svg-border.vue"
export default {
  name: 'menuItem',
  components: { SvgBorder },
  props: {
    item: { type: Object, required: true },
    basePath: { type: String, default: "" },
    className: { type: String, default: () => "menu-item" },
    menuSize: { type: Array, default: () => [120, 34] },
  },
  data() {
    return {
      onlyItem: null,
    }
  },
  methods: {
    resolvePath(routePath) {
      if (this.className == "menu-item") routePath = path.resolve(this.item.path, routePath);
      if (this.basePath.indexOf(routePath) != -1) return this.basePath;
      return path.resolve(this.basePath, routePath);
    },
    onClickMenu(item) {
      this.$emit("activeMenu", item)
    },
    onActiveMenu(item) {
      this.$emit("activeMenu", item)
    },
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

<style lang="scss">
.root-menu {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > .svg-border {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }

  .down-icon {
    transform: rotate(90deg);
  }
}
</style>