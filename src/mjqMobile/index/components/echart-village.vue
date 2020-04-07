<template>
  <div>
    <div id="funnal" ref="pieOne" style="width:100%;height: 77.333vw;"></div>

    <!-- <template v-show="!showChart">
      <div class="noInfoDiv" style="height:220px;">
        <no-info>暂无数据</no-info>
      </div>
    </template>-->
  </div>
</template>

<script>
// import noInfo from "../../../ysgzWeb/components/noInfo";
import echarts from "echarts";
export default {
  name: "FireFannl",
  props: ["villageData"],
  data() {
    return {};
  },
  components: {
    // noInfo
  },
  created() {},
  mounted() {},
  updated() {},
  methods: {
    //渲染页面
    setOption(val) {
      let pieOne = this.$refs.pieOne;
      this.keyUnitChart = echarts.init(pieOne);
      let nameData = [],
        valueData = [];

      val.forEach((item, index) => {
        nameData.push(Object.keys(item)[0]);
        valueData.push(Object.values(item)[0]);
      });
      let option = {
        tooltip: {
          show: true,
          formatter: "{b}:{c}"
        },
        grid: {
          left: "2%",
          top: "3%",
          right: "6%",
          bottom: "8%",
          containLabel: true
        },

        xAxis: {
          type: "value",
          show: false,
          position: "top",
          axisLabel: {
            color: "#afcdff",
            fontSize: "26"
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: "category",
            axisLabel: {
              color: "#afcdff",
              fontSize: "26"
            },
            axisTick: {
              show: false,
              alignWithLabel: false,
              length: 5
            },
            splitLine: {
              //网格线
              show: false
            },
            inverse: "true", //排序
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff"
              }
            },
            data: nameData
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{c}",
                textStyle: {
                  color: "#afcdff", //color of value
                  fontSize: 26
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,

                color: new echarts.graphic.LinearGradient(
                  0,
                  1,
                  1,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#006fe8" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#00ffa9" // 100% 处的颜色
                    }
                  ],
                  false
                ),
                barBorderRadius: 10,
                shadowColor: "rgba(0,255,225,1)",
                shadowBlur: 4
              }
            },
            barWidth: "20",
            barGap: "0%",
            barCategoryGap: "50%",
            data: valueData
          }
        ],
        animation: false
      };
      this.keyUnitChart.setOption(option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fenl_left {
  width: 50%;
  height: 220px;
  float: left;
}
</style>
