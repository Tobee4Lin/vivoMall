<template>
  <div class="news">
      <div class="newsHeader">
        <a href="#" @click="goBack">
            <i class="iconfont icon-552cc14536532"></i>
        </a>
        <span>新闻详情</span>
        </div>
        <div class="newsMain" v-for="news in newsList" :key="news.id">
            <h3 class="newsTitle">{{news.title}}</h3>
            <span class="newsTime">{{news.time}}</span>
            <div style="margin-top: 0.6rem;">
                <div class="newsBox" v-for="box in news.boxs">
                    <p>{{box.p}}</p>
                    <img :src="box.img">
                </div>
            </div>
        </div>
        <div class="newsFooter"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "news",
  data() {
    return {
      newsList: []
    };
  },
  created: function() {
    this.getData();
  },
  methods: {
    getData() {
      let _id = this.$route.query.id;
      let that = this;
      axios.get("../../static/api/information.json").then(res => {
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].id === _id) {
            that.newsList.push(res.data.list[i]);
          }
        }
      });
    },
    goBack: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.news {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.newsHeader {
  position: fixed;
  width: 100%;
  -webkit-box-shadow: 0 0 10px #cecece;
  box-shadow: 0 0 10px #cecece;
  height: 1.3rem;
  line-height: 1.3rem;
  font-size: 0.41rem;
  background: white;
  top: 0;
  text-align: center;
}
.newsHeader i {
  display: block;
  float: left;
  height: 50px;
  font-size: 0.71rem;
  color: black;
  margin-left: 0.3rem;
}
.newsMain {
  margin-top: 0.1rem;
  background: white;
}
.newsTitle {
  width: 282px;
  margin: auto;
  text-align: center;
}
.newsTime {
  text-align: center;
  display: block;
  margin-top: 0.1rem;
}
.newsBox p {
  width: 296px;
  margin: auto;
  font-size: 0.44rem;
  line-height: 150%;
  font-family: 微软雅黑, sans-serif;
  margin-top: 0.3rem;
}
.newsBox p::first-letter {
    font-size: 0.8rem;
    margin-left: -1rem;
}
.newsBox img {
  width: 9.3rem;
  display: block;
  margin: auto;
}
</style>
