<template>
	<h1 :class="'my-2 text-4xl leading-none font-extrabold text-neutral-700 dark:text-neutral-200 tracking-tight' + classes">
    <slot></slot>
  </h1>
</template>

<script>
export default {
  props: {
    align: String
  },
  computed: {
    classes() {
      const classes = [];

      if (this.align === 'center') {
        classes.push('text-center');
      } else if (this.align === 'right') {
        classes.push('text-right');
      }

      return classes.join(' ');
    }
  }
}
</script>
