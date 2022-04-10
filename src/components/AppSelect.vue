<template>
	<label class="inline-block">
		<span v-if="label" class="block text-sm mb-1">{{ label }}</span>
		<select
      class="dark:bg-neutral-800 border dark:border-neutral-700 rounded-sm py-1 px-2 text-sm outline-0 w-full"
			:value="normalizedModelValue"
			@change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="">{{ placeholder }}</option>
      <option v-for="option in options" :value="option[valueKey]">{{ option[nameKey] }}</option>
    </select>
	</label>
</template>

<script>
	export default {
		props: {
			label: [ String, Number ],
			placeholder: {
        type: String,
        default: 'Pick something...'
      },
			modelValue: [ String, Number ],
      options: [ Array ],
      valueKey: String,
      nameKey: String
		},
    computed: {
      normalizedModelValue() {
        return this.modelValue || '';
      }
    }
    // emits: ['update:value']
	}
</script>
