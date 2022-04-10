<template>
  <label>
    <input
      type="checkbox"
      class="mr-1.5"
      @change="$emit('change', $event)"
    >
    <slot>
      <span class="text-sm">
        {{ this.label }}
      </span>
    </slot>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false
    }
  },
  emits: ['change']
}
</script>
