<template>
  <div id="app">
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>

<script>
import rem from './rem/rem.js';
import footer from './components/footer';
export default {
  name: "App",
  components: {
    "v-footer":footer
  }
};
</script>

<style>
@import "./font/iconfont.css";
body {
  padding-bottom: 1.56rem;
  font-family: "微软雅黑";
  background: #f4f4f4;
}
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
</style>
