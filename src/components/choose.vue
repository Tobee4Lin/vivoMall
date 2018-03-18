<template>
  <div class="choose">
      <div class="choose_header">
        <a href="#" @click="goBack">
          <i class="iconfont icon-552cc14536532"></i>
        </a>
        <span>选购手机</span>
      </div>

      <div class="choose_main">
          <mt-navbar v-model="selected">
            <mt-tab-item id="tab-container1">全部</mt-tab-item>
            <mt-tab-item id="tab-container2">Xplay系列</mt-tab-item>
            <mt-tab-item id="tab-container3">X系列</mt-tab-item>
            <mt-tab-item id="tab-container4">Y系列</mt-tab-item>
          </mt-navbar>

          <mt-tab-container v-model="selected" swipeable>
              <mt-tab-container-item id="tab-container1">
                  <ul style="margin-top: 2px;">
                      <li class="_chooseList" v-for="(choose, index) in chooses" :id="choose.id" :key="index" @click="open(choose.id)">
                          <img :src="choose.ImageOne" alt="">
                          <p>{{choose.name}}</p>
                          <p style="font-size: 0.3rem;">{{choose.nametwo}}</p>
                          <div>￥{{choose.Price}}</div>
                      </li>
                  </ul>
              </mt-tab-container-item>

              <mt-tab-container-item id="tab-container2">
                  <ul style="margin-top: 2px;">
                      <li class="_chooseList" v-for="(choose, index) in motos" :id="choose.id" :key="index" @click="open(choose.id)">
                          <img :src="choose.ImageOne" alt="">
                          <p>{{choose.name}}</p>
                          <p style="font-size: 0.3rem;">{{choose.nametwo}}</p>
                          <div>￥{{choose.Price}}</div>
                      </li>
                  </ul>
              </mt-tab-container-item>

              <mt-tab-container-item id="tab-container3">
                  <ul style="margin-top: 2px;">
                      <li class="_chooseList" v-for="(choose, index) in MotoZs" :id="choose.id" :key="index" @click="open(choose.id)">
                          <img :src="choose.ImageOne" alt="">
                          <p>{{choose.name}}</p>
                          <p style="font-size: 0.3rem;">{{choose.nametwo}}</p>
                          <div>￥{{choose.Price}}</div>
                      </li>
                  </ul>
              </mt-tab-container-item>

              <mt-tab-container-item id="tab-container4">
                  <ul style="margin-top: 2px;">
                      <li class="_chooseList" v-for="(choose, index) in z2s" :id="choose.id" :key="index" @click="open(choose.id)">
                          <img :src="choose.ImageOne" alt="">
                          <p>{{choose.name}}</p>
                          <p style="font-size: 0.3rem;">{{choose.nametwo}}</p>
                          <div>￥{{choose.Price}}</div>
                      </li>
                  </ul>
              </mt-tab-container-item>
          </mt-tab-container>
      </div>
  </div>
</template>

<script>
import { Navbar, TabItem } from "mint-ui";
import axios from "axios";
export default {
  name: "choose",
  data() {
    return {
      selected: "tab-container1",
      chooses: [],
      motos: [],
      MotoZs: [],
      z2s: []
    };
  },
  created: function() {
    this.getData();
  },
  methods: {
    getData: function() {
      let that = this;
      axios.get("/static/api/choose.json").then(res => {
        for (let i = 0; i < res.data.chooses.length; i++) {
          that.chooses.push(res.data.chooses[i]);
        }
        for (let i = 0; i < res.data.motos.length; i++) {
          that.motos.push(res.data.motos[i]);
        }
        for (let i = 0; i < res.data.MotoZs.length; i++) {
          that.MotoZs.push(res.data.MotoZs[i]);
        }
        for (let i = 0; i < res.data.z2s.length; i++) {
          that.z2s.push(res.data.z2s[i]);
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    open: function(id) {
      this.$router.push({ path: "goodDetail", query: { id: id } });
    }
  }
};
</script>

<style>
.choose {
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  z-index: 999;
}
.choose_header {
  width: 100%;
  z-index: 1;
  height: 1.3rem;
  line-height: 1.3rem;
  font-size: 12px;
  background: white;
  position: fixed;
  -webkit-box-shadow: 0 0 10px #cecece;
  box-shadow: 0 0 10px #cecece;
  text-align: center;
  font-size: 0.41rem;
}
.choose_header i {
  display: block;
  float: left;
  height: 50px;
  padding-left: 0.3rem;
  font-size: 0.71rem;
  color: black;
}
.choose_main {
  margin-top: 1.32rem;
}
._chooseList {
  height: 6.3rem;
  background: white;
  float: left;
  box-sizing: border-box;
  width: 50%;
  border-right: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
  float: left;
  margin-top: 1px;
  list-style: none;
}
._chooseList p {
  width: 94%;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: auto;
  font-size: 0.35rem;
  text-align: center;
}
._chooseList div {
  text-align: center;
  color: red;
  margin-top: 10px;
}
._chooseList img {
  height: 3.2rem;
  width: 4rem;
  display: block;
  margin: auto;
  padding: 0.5rem;
}
</style>
