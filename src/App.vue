<template>
  <div id="app" class="min-h-screen bg-black text-white">
    <div class="container mx-auto px-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Apply background color globally to the body and html */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #000;
  color: #fff;
}
</style>
