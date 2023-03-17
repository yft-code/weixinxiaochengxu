<!-- 头部 -->
<template>
  <div class="u-header flex align-items-center">
    <!-- logo -->
    <img
      src="@/assets/img/uHeader/logo.png"
      alt=""
      class="u-header-logo cursor-pointer"
      @click="toIndex"
    />
    <div class="u-header-title cursor-pointer" @click="toIndex">
      一拓软件管理平台
    </div>
    <!-- 导航 -->
    <ul class="u-header-navs flex align-items-center flex-grow-base">
      <li
        v-for="(item, index) in navs"
        :key="index"
        :class="[
          'u-header-nav box-sizing-base',
          {
            isActive: item.isActive,
          },
        ]"
      >
        <div
          class="uhn-title flex-all cursor-pointer"
          @click="changeTag(item, navs)"
        >
          <span>{{ item.title }}</span>
        </div>
        <div class="uhn-subs" v-if="item.subs">
          <ul
            :class="[
              'uhn-subs-navs flex',
              {
                noSubs: item.noSubs,
              },
            ]"
          >
            <li
              class="cursor-pointer uhn-subs-nav"
              v-for="(sub, subIndex) in item.subs"
              :key="subIndex"
            >
              <div class="uhn-subs-nav-title" @click="changeT(item, sub)">
                {{ sub.title }}
              </div>
              <ul class="uhn-subs-nav-lists" v-if="sub.subs">
                <li
                  class="uhn-subs-nav-list"
                  v-for="(it, itKey) in sub.subs"
                  :key="itKey"
                >
                  {{ it.title }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <!-- 登录注册 -->
    <ul class="u-header-lr flex-all">
      <li class="u-header-login flex-all">
        <div
          class="cursor-pointer uhlr-item-b flex align-content-center"
          @click="login"
          v-if="isLogin"
        >
          <span class="login-icon uhlr-item-icon"></span>
          <span>登录</span>
        </div>
        <div
          class="cursor-pointer uhlr-item-b flex align-content-center"
          @click="toP"
          v-else
        >
          <span class="control-icon uhlr-item-icon"></span>
          <span>控制台</span>
        </div>
      </li>
      <li class="u-header-register flex-all cursor-pointer">注册</li>
    </ul>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  name: "uHeader",
  data() {
    return {
      isLogin: sessionStorage.isLogin ? false : true,
      navs: [
        {
          title: "产品与服务",
          path: "",
          isActive: true,
          subs: [
            {
              title: "devOps·云测",
              subs: [
                {
                  title: "软件全生命周期管理",
                  path: "",
                },
                {
                  title: "性能测试",
                  path: "",
                },
                {
                  title: "安全测试",
                  path: "",
                },
                {
                  title: "自动化测试",
                  path: "",
                },
              ],
            },
            {
              title: "算法工厂",
              subs: [
                {
                  title: "人识别算法",
                  path: "",
                },
                {
                  title: "事件识别算法",
                  path: "",
                },
                {
                  title: "物体识别算法",
                  path: "",
                },
                {
                  title: "行为检测算法",
                  path: "",
                },
                {
                  title: "神态检测",
                  path: "",
                },
                {
                  title: "量算检测",
                  path: "",
                },
              ],
            },
            {
              title: "智能园区",
              subs: [
                {
                  title: "数字孪生·下一代中控",
                  path: "",
                },
                {
                  title: "AI-园区安全监管平台",
                  path: "",
                },
                {
                  title: "AI园区环境监测平台",
                  path: "",
                },
                {
                  title: "AI园区服务管理平台",
                  path: "",
                },
                {
                  title: "AI园区物业管理平台",
                  path: "",
                },
                {
                  title: "AI园区运营管理平台",
                  path: "",
                },
              ],
            },
            {
              title: "智能工厂",
              subs: [
                {
                  title: "工厂碳排放与碳指挥",
                  path: "",
                },
                {
                  title: "设备故障智能诊断及预测",
                  path: "",
                },
                {
                  title: "AI-5S监管",
                  path: "",
                },
                {
                  title: "AI-安全监管",
                  path: "",
                },
              ],
            },
          ],
        },
        {
          title: "解决方案",
          path: "/cloud",
          isActive: false,
          noSubs: true,
          subs: [
            {
              title: "云通讯",
              link: "http://www.etuocloud.com/sassapi/auth?appid=17760515249&secret=be597b30b8282693ee4162874ada5517",
            },
            {
              title: "DevOps·云测",
              path: "/cloud",
            },
            {
              title: "复空间智慧园区",
              path: "/smartPark/schemeArchitecture",
            },
            {
              title: "复空间智慧工厂",
              path: "/smartFactory/schemeConcept",
            },
          ],
        },
        {
          title: "支持与服务",
          path: "",
          isActive: false,
        },
        {
          title: "新闻资讯",
          path: "",
          isActive: false,
        },
        {
          title: "了解ETaas",
          path: "",
          isActive: false,
        },
      ],
    };
  },
  methods: {
    login() {
      this.isLogin = false;
      sessionStorage.isLogin = this.isLogin;
    },
    toP() {
      this.navs.forEach((item) => {
        item.isActive = false;
      });
      this.toPath("/control");
    },
    toIndex() {
      this.navs.forEach((item, index) => {
        item.isActive = false;
        !index && (item.isActive = true);
      });
      this.toPath("/index");
    },
    changeT(item, sub) {
      this.navs.forEach((it) => {
        it.isActive = false;
      });
      item.isActive = true;
      if (sub.link) window.open(sub.link);
      else this.toPath(sub.path);
    },
    init() {
      this.navs.forEach((item) => {
        item.isActive = false;
        item.path == this.$route.path && (item.isActive = true);
        item.subs &&
          item.subs.forEach((it) => {
            it.path == this.$route.path && (item.isActive = true);
            it.subs &&
              it.subs.forEach((sub) => {
                sub.path == this.$route.path && (item.isActive = true);
              });
          });
      });
    },
    getMd5() {
      var secret2 = md5(
        ("17760515249" + md5("Quantum2018")).toLowerCase() +
          "25623998cccb7f5fbef6fc544ac7dca7"
      );
      var url = `http://www.etuocloud.com/sassapi/auth?appid=17760515249&secret=${secret2}`;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.u-header {
  position: relative;
  z-index: 2;
  height: 76px;
  padding: 0 74px 0 77px;
  background: #fff;
  // logo
  .u-header-logo {
    width: 126px;
  }
  // 导航标题
  .u-header-title {
    margin-left: 23px;
    font: 23px/1 bold;
    color: #333;
  }

  // 导航
  .u-header-navs {
    .u-header-nav {
      margin-left: 50px;
      line-height: 76px;
      font-size: 16px;
      text-align: center;
      .uhn-title {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 20px;
          width: 100%;
          height: 2px;
          background-color: transparent;
        }
      }
      &.isActive,
      &:hover {
        color: $main-color;
        .uhn-title {
          &:after {
            background-color: $main-color;
          }
        }
      }
      // 子目录
      .uhn-subs {
        position: absolute;
        top: 76px;
        left: 0;
        width: 100%;
        padding-bottom: 42px;
        background: #ffffff;
        box-shadow: 0px 4px 3px 0px rgba(217, 217, 217, 0.45);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        color: #666;
        .uhn-subs-navs {
          position: relative;
          left: 460px;
          width: 795px;
          font-size: 14px;
          line-height: 14px;
          text-align: left;
          .uhn-subs-nav {
            min-width: 130px;
            margin-right: 52px;
            margin-top: 17px;
            &:last-child {
              margin-right: 0;
            }
            .uhn-subs-nav-title {
              position: relative;
              padding-bottom: 8px;
              font-weight: bold;
              &:after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 130px;
                height: 1px;
                background-color: #ccc;
              }
            }
            .uhn-subs-nav-lists {
              padding-top: 10px;
              .uhn-subs-nav-list {
                position: relative;
                padding-bottom: 25px;
                &:last-child {
                  padding-bottom: 0;
                }
                &:hover {
                  color: $main-color;
                  &:after {
                    content: "";
                    position: absolute;
                    top: 2px;
                    left: -10px;
                    width: 5px;
                    height: 10px;
                    background: url("~@/assets/img/uHeader/arrow.png") no-repeat;
                    background-size: cover;
                  }
                }
              }
            }
          }
          &.noSubs {
            .uhn-subs-nav {
              margin-top: 32px;
              .uhn-subs-nav-title {
                font-weight: normal;
                &:after {
                  display: none;
                }
                &:hover {
                  color: $main-color;
                }
              }
            }
          }
        }
      }
      &:hover .uhn-subs {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  // 登录注册
  .u-header-lr {
    font-size: 19px;
    line-height: 1;
    .u-header-login {
      .login-icon {
        position: relative;
        top: 2px;
        width: 18px;
        height: 17px;
        margin-right: 8px;
        background: url("~@/assets/img/uHeader/icon_dl.png") no-repeat;
        background-size: cover;
      }
      .control-icon {
        width: 19px;
        height: 19px;
        margin-right: 8px;
        background: url("~@/assets/img/uHeader/icon_kzt.png") no-repeat;
        background-size: cover;
      }
      &:hover {
        .login-icon {
          background: url("~@/assets/img/uHeader/icon_dlhover.png") no-repeat;
          background-size: cover;
        }
        .control-icon {
          background: url("~@/assets/img/uHeader/icon_kzt_hover.png") no-repeat;
          background-size: cover;
        }
      }
    }
    .u-header-register {
      width: 55px;
      height: 32px;
      margin-left: 35px;
      border: 2px solid #ffffff;
      border-radius: 8px;
      background: $main-color;
      color: #fff;
    }
  }
}
</style>
