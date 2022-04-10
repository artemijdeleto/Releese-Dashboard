<template>
  <div class="h-full">
    <vue-cropper
      ref="cropper"
      :aspect-ratio="1"
      alt="Source Image"
      class="h-full"
      @ready="onCrop"
      @cropstart="onCrop"
      @cropmove="onCrop"
      @cropend="onCrop"
      @crop="onCrop"
      @zoom="onCrop"
    />

    <div class="flex">

      <VButton theme="blue" size="sm" @click.prevent="zoom(0.2)">
        Zoom In
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="zoom(-0.2)">
        Zoom Out
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="move(-10, 0)">
        Move Left
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="move(10, 0)">
        Move Right
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="move(0, -10)">
        Move Up
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="move(0, 10)">
        Move Down
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="rotate(90)">
        Rotate +90deg
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="rotate(-90)">
        Rotate -90deg
      </VButton>
      <VButton theme="blue" size="sm" ref="flipX" @click.prevent="flipX">
        Flip X
      </VButton>
      <VButton theme="blue" size="sm" ref="flipY" @click.prevent="flipY">
        Flip Y
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="cropImage">
        Crop
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="reset">
        Reset
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="getData">
        Get Data
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="setData">
        Set Data
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="getCropBoxData">
        Get CropBox Data
      </VButton>
      <VButton theme="blue" size="sm" @click.prevent="setCropBoxData">
        Set CropBox Data
      </VButton>
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import VButton from "@/components/VButton.vue";

export default {
  components: {VButton, VueCropper },
  emits: ['crop'],
  data() {
    return {
      sourceImage: '',
      croppedImage: ''
    }
  },
  methods: {
    setSourceImage(image) {
      this.sourceImage = image;
      this.$refs.cropper.replace(image);
    },
    getCroppedImage() {
      return this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    getCroppedImageFile() {
      return new Promise((resolve, reject) => {
        this.$refs.cropper.getCroppedCanvas().toBlob(blob => resolve(blob));
      });
    },
    onCrop(e) {
      // console.log(e)
    },
    setImageSrc(source) {
      this.$refs.cropper.replace(source);
    },
    cropImage() {
      this.$emit('crop');
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute('data-scale', scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute('data-scale', scale);
    },
    getCropBoxData() {
      console.log(JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4));
    },
    getData() {
      console.log(JSON.stringify(this.$refs.cropper.getData(), null, 4));
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    setCropBoxData() {
      if (!this.data) return;
      this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },
    setData() {
      if (!this.data) return;
      this.$refs.cropper.setData(JSON.parse(this.data));
    },
  }
}
</script>
