<template>
  <div>
    <div class="relative aspect-square">
      <img
        alt="Release cover image"
        class="border dark:border-neutral-700 h-full bg-gray-100 dark:bg-neutral-800 rounded flex justify-center items-center"
        :src="coverSrc"
      >
      <div class="absolute top-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity rounded overflow-hidden">
        <div class="h-full w-full flex justify-center items-center bg-black bg-opacity-50">
          <input
            type="file"
            class="bg-blue-400 hover:bg-blue-500 text-white py-1 px-2 rounded-sm text-xs capitalize font-medium mr-1"
            @change="onFileChanged"
          >
          <button
            class="bg-red-400 hover:bg-red-500 text-white py-1 px-2 rounded-sm text-xs capitalize font-medium"
            @click="clear"
          >
            clear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const defaultCover = '/assets/img/no-photo.png';

export default {
  props: {
    src: {
      type: String,
      required: false,
    },
  },
  emits: ['change'],
  data() {
    return {
      file: null,
      source: defaultCover,
    }
  },
  computed: {
    coverSrc() {
      return this.src || this.source;
    }
  },
  methods: {
    onFileChanged(event) {
      const file = event.target.files[0];
      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
      }

      this.$emit('change', event);

      if (typeof FileReader !== 'function') {
        console.warn('FileReader is not supported');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        this.source = event.target.result;
        this.$emit('image-loaded', event.target.result);
      };
      reader.readAsDataURL(file);
    },
    clear() {
      this.source = '';
      this.file = null;
    }
  }
}
</script>
