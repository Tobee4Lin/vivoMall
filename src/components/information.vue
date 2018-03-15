<template>
  <div class="information">
      <div class="informationHeader">
          <span>新闻信息</span>
      </div>
      <div class="informationMain" style="margin-top: 1.33rem;">
          <ul>
              <li v-for="(information, index) in informations" :key="index" :id="information.id" @click="open(information.id)">
                <h3 class="MainTitle" style="color:#434343"> {{information.title}}</h3  >
                <span class="MainTime">{{information.time}}</span>
                <div class="informationImg">
                    <img :src="information.img" alt="图片">
                </div>
                <a href="">阅读全文</a>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "information",
  data() {
    return {
      informations: []
    };
  },
  created: function() {
    this.getData();
  },
  methods: {
    getData: function() {
      let that = this;
      axios.get("../../static/api/information.json").then(res => {
        for (let i = 0; i < res.data.informations.length; i++) {
          that.informations.push(res.data.informations[i]);
        }
      });
    },
    open: function(id) {
      this.$router.push({ path: "news", query: { id: id } });
    }
  }
};
</script>

<style>
.informationHeader {
  position: fixed;
  width: 100%;
  -webkit-box-shadow: 0 0 10px #cecece;
  box-shadow: 0 0 10px #cecece;
  height: 1.3rem;
  line-height: 1.3rem;
  font-size: 0.35rem;
  padding-left: 0.3rem;
  background: white;
  top: 0;
  font-size: 0.41rem;
}
.informationHeader i {
  display: block;
  float: left;
  height: 50px;
  padding-left: 0.3rem;
  font-size: 22px;
  color: black;
}
.Mainlist {
  width: 100%;
  height: 7rem;
  background: white;
  margin-top: 5px;
  padding-top: 0.35rem;
}

.MainTitle {
  width: 77%;
  text-align: left;
  margin: auto;
  color: rgb(67, 67, 67);
  font-size: 0.4rem;
}
.MainTime {
  width: 78%;
  margin: auto;
  display: block;
  line-height: rem;
  padding: 7px 36px;
  font-size: 0.1rem;
}
.informationImg {
  text-align: center;
}
.informationImg img {
  width: 80%;
  height: 4.7rem;
}
.informationMain a {
  float: right;
  font-size: 0.3rem;
  margin-right: 0.75rem;
  margin-top: 0.2rem;
  color: black;
}
.informationMain li {
  height: 300px;
}
</style>

