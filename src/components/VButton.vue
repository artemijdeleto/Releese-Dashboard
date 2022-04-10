<template>
	<button
    :class="[
      'inline-block shadow-sm font-medium',
      roundedClass,
      themeClasses,
      sizeClasses
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      required: false,
      default: 'md'
    },
    theme: {
      type: String,
      required: false,
      default: 'default'
    },
    rounded: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    roundedClass() {
      const size = this.rounded;

      if (size === '') {
        return 'rounded';
      }

      if (size === 'sm') {
        return 'rounded-sm';
      }

      if (size === 'xs') {
        return 'rounded-sm';
      }

      return '';
    },
    sizeClasses() {
      const size = this.size;

      if (size === 'sm') {
        return 'text-sm p-1 px-4';
      }

      if (size === 'xs') {
        return 'text-xs p-1 px-2';
      }

      return 'p-2 px-4';
    },
    themeClasses() {
      const theme = this.theme;

      if (theme === 'red') {
        return 'bg-red-600 hover:bg-red-700 text-white';
      }

      if (theme === 'blue') {
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      }

      return '';
    }
  }
}
</script>
