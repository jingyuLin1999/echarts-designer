<template>
  <li v-if="isShow()" :class="[
    item.meta && item.meta.className == 'leftExpand'
      ? 'left-menu-item-li'
      : 'menu-item-li',
    className,
    {
      'left-menu-item-li': item.meta && item.meta.className == 'more',
    },
  ]">
    <router-link class="menu-link" v-if="onlyOneChildren()" :to="resolvePath(onlyItem.path)">
      <div :class="[
        className == 'menu-item' ? 'root-menu' : '',
        onlyItem.activeMenu ? 'active-menu' : '',
      ]" @click="onClickMenu(onlyItem)">
        <div class="menu-title"
          :style="{ width: menuSize[0] - 15 + 'px', height: menuSize[1] + 'px', ...onlyItem.meta.style }">
          <!--  lineHeight: menuSize[1] / 2 + 'px' -->
          <span v-html="(internation ? $t(onlyItem.meta.title) : onlyItem.meta.title)"></span>
        </div>
        <SvgBorder v-if="className == 'menu-item'" :menuSize="menuSize"> </SvgBorder>
      </div>
    </router-link>
    <template v-else>
      <div v-if="item.meta" :class="[
        'menu-link',
        className == 'menu-item' ? 'root-menu' : '',
        item.activeMenu ? 'active-menu' : '',
      ]">
        <div class="menu-title" :style="{ maxWidth: menuSize[0] - 15 + 'px', height: menuSize[1] + 'px' }">
          <span v-html="internation ? $t(item.meta.title) : item.meta.title" :style="{ ...item.meta.style }"></span>
          <span :class="[
            'iconfont',
            'icon-arrow',
            className == 'menu-item' ? 'down-icon' : '',
          ]"></span>
        </div>
        <SvgBorder v-if="className == 'menu-item'" :menuSize="menuSize"> </SvgBorder>
      </div>
      <ul class="menu-item-ul sub-menu-item" v-if="item.children">
        <menuItem v-for="(child, index) in item.children" :key="index" :item="child" :internation="internation"
          className="sub-menu-item" :menuSize="menuSize" :base-path="resolvePath(child.path)" @activeMenu="onActiveMenu">
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
    internation: { type: Boolean, default: false, } // 是否国际化
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
    isShow() {
      let { children } = this.item;
      if (!children &&
        (this.item.hidden == true ||
          (this.item.meta &&
            this.item.meta.hidden == true)
        )) return false;
      return true;
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
.menu-title {
  text-align: center;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  // font-size: 13px;
  //user-select: none;

  &::-webkit-scrollbar {
    width: 10px;
    height: 1px;
  }
}

.root-menu {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    clear: both,
  }

  >.svg-border {
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