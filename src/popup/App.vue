<template>
  <pop-up />
</template>

<script>
import PopUp from '@/components/PopUp.vue'

export default {
  name: 'App',
  components: { PopUp }
}
</script>

<style lang="scss">
html {
  width: 400px;
  height: 300px;
}

body {
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0;

  &::before {
    content: "";
    width: 400px;
    height: 300px;
    background-image: url(https://source.unsplash.com/collection/9294309/800x600);
    background-size: cover;
    margin: 0 auto;
    padding: 0;
    position: absolute;
    z-index: -1;
    -webkit-filter: blur(3px);
      -moz-filter: blur(3px);
      -o-filter: blur(3px);
      -ms-filter: blur(3px);
      filter: blur(3px);  
  }
}
</style>
