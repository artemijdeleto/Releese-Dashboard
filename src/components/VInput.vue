<template>
	<label class="inline-block">
		<span v-if="label" class="block text-sm mb-1">{{ label }}</span>
		<input
      class="dark:bg-neutral-800 border dark:border-neutral-700 rounded-sm py-1 px-2 text-sm outline-0 w-full"
			:value="modelValue"
			:placeholder="placeholder"
			@change="$emit('update:modelValue', $event.target.value)">
	</label>
</template>

<style>
	/*.label {
		display: block;
		!*margin-bottom: .25rem;*!
	}

	label {
		display: inline-block;
	}

	input {
		border: 0;
		border-bottom: 2px solid #55889E;
		!*border-radius: 5px;*!
		padding: .5rem 0rem;
	}*/
</style>

<script>
	export default {
		props: {
			label: [ String, Number ],
			placeholder: [ String, Number ],
			modelValue: [ String, Number ]
		},
    // emits: ['update:value']
	}
</script>
