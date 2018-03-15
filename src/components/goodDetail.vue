<template>
  <div class="goodDetail">
      <div class="goodDetailHeader">
          <a href="#" @click="goBack">
              <i class="iconfont icon-552cc14536532"></i>
          </a>
          <span>{{goodDetailHeader}}</span>
      </div>
      <div class="goodDetailList">
          <ul style="backgroundColor:white">
              <li v-for="(goodDetail, index) in goodDetails" :key="goodDetail.id">
                  <div class="goodDetailSwipe">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item><img :src="goodDetail.imgone"></mt-swipe-item>
                        <mt-swipe-item><img :src="goodDetail.imgtwo"></mt-swipe-item>
                        <mt-swipe-item><img :src="goodDetail.imgThree"></mt-swipe-item>
                    </mt-swipe>
                  </div>
                  <div class="goodDetailMain">
                    <div class="goodDetailName">{{goodDetail.name}}</div>
                    <div class="goodDetailPaid">￥ {{goodDetail.price}}</div>
                  </div>
                  <div class="goodDetailValue">
                      <div class="_Value">购买数量：</div>
                      <div class="_cartNumber" style="margin-left: 2rem;">
                        <a href="#" class="goodDetailReduce" @click="reduce(index)">-</a>
                        <input type="text" v-model="goodDetail.value" readonly>
                        <a href="#" class="goodDetailAdd" @click="add(index)">+</a>
                      </div>
                  </div>
                  <div class="goodDetailBox">
                    <mt-navbar v-model="selected" >
                        <mt-tab-item id="tab-container1">图文详情</mt-tab-item>
                        <mt-tab-item id="tab-container2">商品配置</mt-tab-item>
                    </mt-navbar>

                    <mt-tab-container v-model="selected" swipeable>
                        <mt-tab-container-item id="tab-container1">
                            <div class="goodDetailImg">
                                <p v-for="Image in goodDetail.Images">
                                    <img :src="Image.one" alt="详情图片">
                                </p>
                            </div>
                        </mt-tab-container-item>

                        <mt-tab-container-item id="tab-container2">
                            <div class="goodDetailPeizhi">
                                <table style="width: 100%;border:1px solid #cccccc;margin-top: 5px;border-collapse: collapse;margin-bottom: 10px;" border="1">
                                    <tbody>
                                        <tr v-for="Peizhi in goodDetail.Peizhis">
                                            <td style="width:26%;height:50px">{{Peizhi.left}}</td>
                                            <td style="width:80%;height:50px">{{Peizhi.right}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </mt-tab-container-item>    

                    </mt-tab-container>
                  </div>

                  <div class="goodDetailFooter">
                      <div class="addToCart">
                        <a href="javascript:void(0);" @click="addToCart(index)">加入购物车</a>
                      </div>
                      <div class="purchase">
                        <a href="javascript:void(0);" @click="payNow(index)">立即支付</a>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import { Navbar, TabItem } from "mint-ui";
import { TabContainer, TabContainerItem } from "mint-ui";
import axios from "axios";

export default {
  name: "goodDetail",
  data() {
    return {
      goodDetailHeader: "商品详情",
      goodDetails: [],
      selected: "tab-container1"
    };
  },
  created: function() {
    this.getData();
  },
  computed: {
    paid: function() {
      let paid = 0;
      for (let i in this.goodDetails) {
        paid += this.goodDetails[i].price * this.goodDetails[i].value;
      }
      return paid;
    }
  },
  methods: {
    getData() {
      let _id = this.$route.query.id;
      let that = this;
      axios.get("/static/api/goodDetail.json").then(res => {
        for (let i = 0; i < res.data.goodDetails.length; i++) {
          if (res.data.goodDetails[i].id === _id) {
            that.goodDetails.push(res.data.goodDetails[i]);
          }
        }
      });
    },
    reduce: function(index) {
      if (this.goodDetails[index].value > 1) {
        this.goodDetails[index].value--;
      } else {
        MessageBox("提示", "不能再减了");
      }
    },
    add: function(index) {
      if (this.goodDetails[index].value < 5) {
        this.goodDetails[index].value++;
      } else {
        MessageBox("提示", "已达上限");
      }
    },
    addToCart: function(index) {
      let idExist = this.$store.state.carts.find(todo => {
        return todo.id == this.goodDetails[index].id;
      });

      if (!idExist) {
        var data = {
          id: this.goodDetails[index].id,
          name: this.goodDetails[index].name,
          price: this.goodDetails[index].price,
          imgone: this.goodDetails[index].imgone,
          value: this.goodDetails[index].value
        };
        this.$store.commit("addCarts", data);
        Toast({
          message: "加入购物车成功！",
          iconClass: "iconfont icon-goumaichenggong-copy",
          duration: 950
        });
      } else {
        MessageBox("提示", "商品已存在购物车");
      }
    },
    payNow: function(index) {
      Toast({
        message: `成功支付了${this.paid}元`,
        iconClass: "iconfont icon-goumaichenggong",
        duration: 750
      });
      var data = {
        id: this.goodDetails[index].id,
        name: this.goodDetails[index].name,
        price: this.goodDetails[index].price,
        image: this.goodDetails[index].imgone,
        value: this.goodDetails[index].value,
        order: this.goodDetails[index].order,
        color: this.goodDetails[index].color,
        number: this.goodDetails[index].number
      };
      this.$store.commit("addorder", data);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.goodDetail {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #fff;
}
.goodDetailHeader {
  width: 100%;
  z-index: 1;
  background: white;
  position: fixed;
  box-shadow: 0 0 10px #cecece;
  text-align: center;
  font-size: 0.41rem;
}
.goodDetailHeader i {
  display: block;
  float: left;
  height: 50px;
  line-height: 43px;
  padding-left: 0.2rem;
  font-size: 0.71rem;
  color: black;
}
.goodDetailHeader span {
  margin-left: -0.5rem;
  height: 1.2rem;
  line-height: 1.3rem;
}
.goodDetailList {
  margin-bottom: 1rem;
}
.goodDetailSwipe {
  height: 11rem;
  margin-top: 3px;
  background: white;
}
.goodDetailSwipe img {
  width: 70%;
  height: 7rem;
  display: block;
  margin: 80px auto;
}
.goodDetailMain {
  background: white;
  border-bottom: 1px solid #cecece;
  border-top: 1px solid #cecece;
  padding: 0.4rem;
}
.goodDetailName {
  color: black;
  font-weight: 800;
  font-size: 0.35rem;
}
.goodDetailPaid {
  color: red;
  font-size: 0.4rem;
}
.goodDetailValue {
  height: 1rem;
  border-bottom: 1px solid #cecece;
  padding: 0.4rem;
  margin-top: 0.15rem;
}
.goodDetailValue a {
  text-decoration: none;
}
.goodDetailAdd {
  width: 1rem;
  height: 0.8rem;
  line-height: 0.7rem;
  display: block;
  background: white;
  float: left;
  border: 1px solid #b2b2b2;
  border-left: none;
  text-align: center;
  font-size: 0.5rem;
  color: black;
}
.goodDetailReduce {
  width: 1rem;
  height: 0.8rem;
  line-height: 0.7rem;
  display: block;
  background: white;
  float: left;
  border: 1px solid #b2b2b2;
  border-right: none;
  text-align: center;
  font-size: 0.5rem;
  color: black;
}
._cartNumber input {
  width: 1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  float: left;
  border: 1px solid #b2b2b2;
  text-align: center;
  color: black;
}
._Value {
  float: left;
  margin-top: 0.2rem;
}

goodDetailBox {
  height: 1px;
}
.goodDetailImg {
  margin-top: 4px;
  margin-bottom: 6px;
}
.goodDetailImg img {
  width: 100%;
  height: auto;
  display: block;
}
table td {
  font-size: 0.31rem;
  text-align: center;
  color: #000;
}
.goodDetailFooter {
  position: fixed;
  width: 100%;
  bottom: 0rem;
  height: 1.3rem;
  background: #f6f4f7;
  border-top: 1px solid #efefef;
}
.addToCart a {
  display: block;
  width: 50%;
  height: 1.3rem;
  line-height: 1.3rem;
  text-align: center;
  background: #ff9800;
  color: white;
  font-size: 0.35rem;
  float: left;
}
.purchase a {
  float: left;
  display: block;
  width: 50%;
  height: 1.3rem;
  line-height: 1.3rem;
  text-align: center;
  color: white;
  font-size: 0.35rem;
  background: #e3211e;
}
</style>
