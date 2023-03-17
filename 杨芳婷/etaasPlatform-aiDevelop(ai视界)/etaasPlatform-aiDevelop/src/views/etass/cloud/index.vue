<template>
<div id="cloud">
  <div class="bnner">
    <div class="bnner_title">
      <span class="title">一站式软件质量·云测平台</span>
    </div>
    <div class="bnner_centent">
      <span class="centent">助力团队高效·可靠地构建预发布产品·快速交付用户价值益</span>
    </div>
    <div>
      <button type="button" name="button" class="bnner_btn" @click='bnnerBtnClick'>
        <div class="bnner_type">
          免费试用
        </div>
      </button>
    </div>
  </div>
  <div class="programme">
    <div class="programmeicon">
    </div>
    <div class="programmeicon1">
    </div>
  </div>
  <div class="plan">
    <div class="planicon">
    </div>
    <div class="planicon1">
      <div class="agile_img">
      </div>
      <div class="agile_cnetent">
        <div class="agile_cnetent_fistsize">
          <span class="agile_cnetent_01_style">01</span>
        </div>
        <div class="agile_cnetent_strip">

        </div>
        <div class="agile_cnetent_secondsize">
          <span class="agile_cnetent_secondsize_style">按自己的步伐进行转型</span>
        </div>
        <div class="agile_cnetent_secondsize_third">
          <span class="agile_cnetent_third_style">加速从迭代应用程序交付方法到敏捷测试和 DevOps 实践的转型。</span>
        </div>
      </div>
    </div>
  </div>

  <div class="integrate">
    <div class="planicon1">
      <div class="agile_cnetent">
        <div class="agile_cnetent_fistsize">
          <span class="agile_cnetent_01_style">02</span>
        </div>
        <div class="agile_cnetent_strip">

        </div>
        <div class="agile_cnetent_secondsize">
          <span class="agile_cnetent_secondsize_style">主流研发工具集成，可视化流水线</span>
        </div>
        <div class="agile_cnetent_secondsize_third">
          <span class="agile_cnetent_third_style">支持Gitlab、Github、Jenkins等主流研发工具，提供可视化交付流水线管理，深度整合研发工具链</span>
        </div>
      </div>
      <div class="agile_img">
      </div>
    </div>
  </div>

  <div class="technologicalprocess">
    <div class="planicon1">
      <div class="agile_img">
      </div>
      <div class="agile_cnetent">
        <div class="agile_cnetent_fistsize">
          <span class="agile_cnetent_01_style">03</span>
        </div>
        <div class="agile_cnetent_strip">

        </div>
        <div class="agile_cnetent_secondsize">
          <span class="agile_cnetent_secondsize_style">将质量嵌入发布管理流程中</span>
        </div>
        <div class="agile_cnetent_secondsize_third">
          <span class="agile_cnetent_third_style">优先考虑质量，并通过发布管理在软件交付的每个阶段确保质量。</span>
        </div>
      </div>
    </div>
  </div>
  <div class="foot">
    <div class="foot_centent">
      一站式DevOps，助力产品交付提效
    </div>
    <button type="button" name="button" class="foot_btn">
      <div class="foot_type">
        现在开始
      </div>
    </button>
  </div>
</div>
</template>
<script>
export default {
  name: "cloud",
  data: () => ({

  }),
  methods: {
    bnnerBtnClick() {
    }
  }
}
</script>
<style lang="scss" scoped>
#cloud {
    // 头部 bnner

    .bnner {
        height: 400px;
        background: url("~@/assets/img/cloud/1.png") no-repeat;
        background-size: cover;
        overflow: hidden;
        .bnner_title {
            margin-top: 107px;
            margin-left: 579px;
            .title {
                font-size: 72px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: #FFFFFF;
                line-height: 65px;
            }
        }
        .bnner_centent {
            margin-top: 34px;
            margin-left: 673px;
            .centent {
                font-size: 24px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 65px;
                text-shadow: 0 2px 0 rgba(91, 255, 255, 0.35);
            }
        }
        .bnner_btn {
            width: 200px;
            height: 56px;
            border: solid 1px #FFFFFF;
            background: #FFFFFF;
            border-radius: 8px;
            margin-top: 40px;
            margin-left: 861px;
            .bnner_type {
                width: 130px;
                height: 56px;
                margin-left: 35px;
                margin-top: 10px;
                font-size: 24px;
                font-weight: Bold;
                color: #545EED;
                letter-spacing: 8px;
            }
        }
    }
    // 解决方案
    .programme {
        height: 918px;
        width: 100%;
        background: url("~@/assets/img/cloud/9.png") no-repeat;
        background-size: cover;
        overflow: hidden;
        .programmeicon {
            width: 327px;
            height: 44px;
            margin-top: 30px;
            margin-left: 787px;
            background: url("~@/assets/img/cloud/2.png") no-repeat;
            background-size: cover;
        }
        .programmeicon1 {
            width: 1199px;
            height: 748px;
            margin-top: 30px;
            margin-left: 360px;
            background: url("~@/assets/img/cloud/3.png") no-repeat;
            background-size: cover;
        }
    }
    //计划
    .plan {
        height: 746px;
        width: 100%;
        overflow: hidden;
        .planicon {
            width: 712px;
            height: 45px;
            margin-top: 30px;
            margin-left: 600px;
            background: url("~@/assets/img/cloud/4.png") no-repeat;
            background-size: cover;
        }
        .planicon1 {
            width: 1208px;
            height: 484px;
            margin-top: 72px;
            margin-left: 349px;
            display: flex;
            .agile_img {
                width: 684px;
                height: 484px;
                background: url("~@/assets/img/cloud/5.png") no-repeat;
                background-size: cover;
            }
            .agile_cnetent {
                height: 484px;
                width: 560px;
                .agile_cnetent_fistsize {
                    height: 34px;
                    margin-top: 78px;
                    margin-left: 72px;
                    .agile_cnetent_01_style {
                        font-size: 42px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #333333;
                        line-height: 34px;
                    }
                }
                .agile_cnetent_strip {
                    width: 2px;
                    height: 54px;
                    margin-top: 20px;
                    margin-left: 94px;
                    background: #666666;
                }
                .agile_cnetent_secondsize {
                    margin-top: 18px;
                    margin-left: 72px;
                    height: 24px;
                    .agile_cnetent_secondsize_style {
                        font-size: 24px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #666666;
                        line-height: 24px;
                    }
                }
                .agile_cnetent_secondsize_third {
                    margin-top: 22px;
                    margin-left: 69px;
                    .agile_cnetent_third_style {
                        font-size: 16px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #999999;
                    }
                }
            }
        }
    }
    //集成
    .integrate {
        height: 600px;
        width: 100%;
        background: url("~@/assets/img/cloud/10.png") no-repeat;
        background-size: cover;
        overflow: hidden;
        .planicon1 {
            width: 1208px;
            height: 484px;
            margin-top: 72px;
            margin-left: 349px;
            display: flex;
            .agile_img {
                width: 684px;
                height: 484px;
                background: url("~@/assets/img/cloud/6.png") no-repeat;
                background-size: cover;
            }
            .agile_cnetent {
                height: 484px;
                width: 560px;
                .agile_cnetent_fistsize {
                    height: 34px;
                    margin-top: 78px;
                    margin-left: 72px;
                    .agile_cnetent_01_style {
                        font-size: 42px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #333333;
                        line-height: 34px;
                    }
                }
                .agile_cnetent_strip {
                    width: 2px;
                    height: 54px;
                    margin-top: 20px;
                    margin-left: 94px;
                    background: #666666;
                }
                .agile_cnetent_secondsize {
                    margin-top: 18px;
                    margin-left: 72px;
                    height: 24px;
                    .agile_cnetent_secondsize_style {
                        font-size: 24px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #666666;
                        line-height: 24px;
                    }
                }
                .agile_cnetent_secondsize_third {
                    margin-top: 22px;
                    margin-left: 69px;
                    .agile_cnetent_third_style {
                        font-size: 16px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #999999;
                    }
                }
            }
        }
    }
    // 流程
    .technologicalprocess {
        height: 600px;
        width: 100%;
        .planicon1 {
            width: 1208px;
            height: 484px;
            margin-top: 72px;
            margin-left: 349px;
            display: flex;
            .agile_img {
                width: 684px;
                height: 484px;
                background: url("~@/assets/img/cloud/7.png") no-repeat;
                background-size: cover;
            }
            .agile_cnetent {
                height: 484px;
                width: 560px;
                .agile_cnetent_fistsize {
                    height: 34px;
                    margin-top: 78px;
                    margin-left: 72px;
                    .agile_cnetent_01_style {
                        font-size: 42px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #333333;
                        line-height: 34px;
                    }
                }
                .agile_cnetent_strip {
                    width: 2px;
                    height: 54px;
                    margin-top: 20px;
                    margin-left: 94px;
                    background: #666666;
                }
                .agile_cnetent_secondsize {
                    margin-top: 18px;
                    margin-left: 72px;
                    height: 24px;
                    .agile_cnetent_secondsize_style {
                        font-size: 24px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #666666;
                        line-height: 24px;
                    }
                }
                .agile_cnetent_secondsize_third {
                    margin-top: 22px;
                    margin-left: 69px;
                    .agile_cnetent_third_style {
                        font-size: 16px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #999999;
                    }
                }
            }
        }
    }
    // 脚部
    .foot {
        height: 300px;
        width: 100%;
        background: url("~@/assets/img/cloud/8.png") no-repeat;
        background-size: cover;
        overflow: hidden;
        .foot_centent {
            height: 65px;
            margin-left: 494px;
            margin-top: 77px;
            font-size: 60px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 65px;
        }
        .foot_btn {
            width: 200px;
            height: 56px;
            border: solid 1px #FFFFFF;
            background: #FFFFFF;
            border-radius: 8px;
            margin-top: 44px;
            margin-left: 893px;
            .foot_type {
                width: 130px;
                height: 56px;
                margin-left: 35px;
                margin-top: 10px;
                font-size: 24px;
                font-weight: Bold;
                color: #545EED;
                letter-spacing: 8px;
            }
        }
    }

}
</style>
