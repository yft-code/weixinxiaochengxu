<template>
  <div class="u-footer">
    <div class="wrapper flex">
      <!-- 联系我们 -->
      <div class="u-footer-contactus">
        <img src="@/assets/img/uHeader/logo.png" alt="" />
        <div class="ufcu-tel">服务热线:400-8226-666</div>
        <div class="cursor-pointer">更多联系方式</div>
        <button class="ufcu-btn flex-all">
          <img src="@/assets/img/uFooter/icon_kf.png" alt="" />
          <span>在线客服</span>
        </button>
      </div>

      <!-- 信息 -->
      <div class="u-footer-info">
        <!-- 列表 -->
        <ul class="u-footer-lists flex flex-grow-base">
          <li v-for="(item, index) in lists" :key="index" class="u-footer-list">
            <div class="u-footer-list-title">{{ item.title }}</div>
            <ul v-if="item.subs">
              <li v-for="(sub, subIndex) in item.subs" :key="subIndex">
                {{ sub.title }}
              </li>
            </ul>
            <img
              src="@/assets/img/uFooter/img_ewm.png"
              class="u-footer-ewm"
              v-else
            />
          </li>
        </ul>
        <!-- 其他信息 -->
        <div class="ufi-box">
          <div class="ufi-box-link flex align-items-center">
            <span class="ufi-box-link-label">快速链接</span>
            <div class="ufi-box-links">
              <span>一拓官网</span>
              <span>ETaas</span>
              <span>Dxc</span>
            </div>
            <div class="ufi-box-more">更多友情链接</div>
          </div>
          <div class="u-footer-info-des">
            <div>
              © Copyright 2018 容联 All Rights Reserved 一拓通信息技术有限公司
            </div>
            <div>
              <span>增值电信业务经营许可证：B2-200******</span>
              <span>电信与信息服务业务经营许可证：苏ICP证*******号</span>
              <span>ICP备案： 苏ICP备*******</span>
            </div>
            <div>
              一拓app | 开发者：一拓通信息技术有限公司 | 应用版本：一拓 1.0.3
            </div>
          </div>
          <div class="ufi-box-info">
            | <span class="cursor-pointer">服务协议</span> |
            <span class="cursor-pointer">隐私条款</span> |
            <span class="cursor-pointer">应用权限</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        {
          title: "关于我们",
          subs: [
            {
              title: "关于ETaas",
            },
            {
              title: "业绩案例",
            },
            {
              title: "服务条款",
            },
          ],
        },
        {
          title: "热门产品",
          subs: [
            {
              title: "AI视觉",
            },
            {
              title: "小章智能体",
            },
            {
              title: "小复智能体",
            },
            {
              title: "小拓智能体",
            },
          ],
        },
        {
          title: "服务与支持",
          subs: [
            {
              title: "新账户指引",
            },
            {
              title: "控制台登录",
            },
            {
              title: "充值管理",
            },
            {
              title: "消费管理",
            },
            {
              title: "联系销售",
            },
          ],
        },
        {
          title: "关注我们",
          img: require("@/assets/img/uFooter/img_ewm.png"),
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.u-footer {
  padding: 58px 0 32px;
  letter-spacing: 1px;
  background-color: #011537;
  color: #fff;
  // 联系我们
  .u-footer-contactus {
    .ufcu-tel {
      margin-top: 17px;
    }
    .ufcu-btn {
      width: 100px;
      height: 32px;
      margin-top: 16px;
      letter-spacing: 2px;
      background: linear-gradient(1deg, #1886e3, #23bfe0);
      border-radius: 4px;
      border: 0;
      color: #fff;
      cursor: pointer;
      img {
        width: 15px;
        margin-right: 6px;
      }
    }
  }
  .u-footer-info {
    margin-left: 82px;
    // 列表
    .u-footer-lists {
      padding-bottom: 44px;
      border-bottom: 1px solid #43577a;
      .u-footer-list {
        width: 25%;
        .u-footer-list-title {
          padding-bottom: 14px;
          border-bottom: 1px solid #43577a;
          font-size: 20px;
          line-height: 1;
          font-weight: bold;
        }
        li {
          margin-top: 21px;
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          &:hover {
            color: #46aaff;
          }
        }
        .u-footer-ewm {
          width: 60px;
          margin-top: 26px;
        }
      }
    }
    // 其他信息
    .ufi-box {
      margin-top: 28px;
      .ufi-box-link {
        font-size: 16px;
        line-height: 1;
        .ufi-box-links {
          margin: 0 73px 0 37px;
          span {
            margin-right: 19px;
            cursor: pointer;
            &:last-child {
              margin-right: 0;
            }
            &:hover {
              color: #46aaff;
            }
          }
        }
      }
      // ufi-box-link-label

      .u-footer-info-des {
        margin: 29px 0 23px;
        line-height: 1;
        color: #cccccc;
        div {
          margin-top: 18px;
          span {
            margin-right: 20px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
