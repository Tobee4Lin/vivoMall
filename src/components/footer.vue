<template>
  <div class="footer">
      <router-link class="nav-item" :to="{name:'Home'}" tag="li">
        <i class="iconfont icon-shouye"></i>
        <div>首页</div>
      </router-link>
      <router-link class="nav-item" :to="{name:'information'}" tag="li">
        <i class="iconfont icon-xinwen3"></i>
        <div>资讯</div>
      </router-link>
      <router-link class="nav-item" :to="{name:'carts'}" tag="li">
          <i class="iconfont icon-gouwu"></i>
          <div>购物车</div>
      </router-link>
      <router-link class="nav-item" :to="{name:'my'}" tag="li">
          <i class="iconfont icon-wode2"></i>
          <div>我的</div>
      </router-link>
  </div>
</template>

<script>
</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  background-color: #fff;
  z-index: 100;
  height: 1.5rem;
}
.footer i {
  font-size: 0.65rem;
}
.footer li {
  margin-top: 0.05rem;
}
.nav-item:link,
.nav-item:visited {
  color: black;
}
.router-link:hover {
  color: rebeccapurple;
}
.router-link:active {
  color: #f60;
}
</style>
