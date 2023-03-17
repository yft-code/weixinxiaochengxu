<template>
  <div
      :class="flex === 'x' ? 'x-handle' : 'y-handle'"
      @mousedown="mouseDown"
  ></div>
</template>

<script>
export default {
  name: "LzXyhandle",
  props: {
    direction: {
      type: String,
      default() {
        return "left";
      }
    },
    flex: {
      type: String,
      default() {
        return "x";
      }
    }
  },
  data() {
    return {
      lastX: "",
      isMouseMove: false
    };
  },

  created() {
    document.addEventListener("mouseup", this.mouseUp);
  },

  destroyed() {
    document.removeEventListener("mouseup", this.mouseUp);
  },

  methods: {
    mouseDown(event) {
      document.addEventListener("mousemove", this.mouseMove);
      if (this.flex === "y") {
        this.lastX = event.screenY;
      } else {
        this.lastX = event.screenX;
      }
    },
    mouseMove(event) {
      if (this.flex === "y") {
        if (this.direction === "top") {
          this.$emit("widthChange", this.lastX - event.screenY, this.direction);
        } else if (this.direction === "bottom") {
          this.$emit("widthChange", event.screenY - this.lastX, this.direction);
        }
        this.isMouseMove = true;
        this.lastX = event.screenY;
      } else {
        if (this.direction === "left") {
          this.$emit("widthChange", this.lastX - event.screenX, this.direction);
        } else if (this.direction === "right") {
          this.$emit("widthChange", event.screenX - this.lastX, this.direction);
        }
        this.isMouseMove = true;
        this.lastX = event.screenX;
      }
    },
    mouseUp() {
      this.$emit("mouseUpInfo", this.direction, this.isMouseMove);
      this.isMouseMove = false;
      this.lastX = "";
      document.removeEventListener("mousemove", this.mouseMove);
    }
  }
};
</script>
<style scoped>
.x-handle {
  width: 4px;
  cursor: w-resize;
  z-index: 10;
  background: #f6f9fe;
}
.y-handle {
  height: 4px;
  cursor: s-resize;
  z-index: 10;
  background: #f6f9fe;
}
</style>
