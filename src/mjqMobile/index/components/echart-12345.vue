<template>
  <div style="width:97%;height: 110vw; overflow-y:auto;">
    <div id="funnal" ref="pieOne" style=" width:98%;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "chart12345",
  props: ["chartData"],
  data() {
    return {
      autoHeight: 0
    };
  },
  components: {},
  created() {},
  mounted() {},
  updated() {},
  methods: {
    //渲染页面
    setOption(val) {
      let pieOne = this.$refs.pieOne;
      let myChart = echarts.init(pieOne);
      myChart.clear();
      this.autoHeight = val.length * 50; // this.counts为柱状图的条数，即数据长度。
      myChart.getDom().style.height = this.autoHeight + "px";
      myChart.resize();

      let nameData = [],
        valueData = [];

      val.forEach((item, index) => {
        nameData.push(Object.keys(item)[0]);
        valueData.push(Object.values(item)[0]);
      });

      let option = {
        grid: {
          top: 0,
          left: "5%",
          right: "3%",
          bottom: "0",
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
              fontSize: "26",
              inside: false,
              // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
              formatter: function(value, index) {
                var str = value;
                if (str.length > 6) {
                  str = str.substr(0, 6);
                }
                return str;
              }
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
            inverse: "false", //排序
            axisLine: {
              show: false,
              lineStyle: {
                color: "#b3ccf8"
              }
            },
            data: nameData
          },
          {
            type: "category",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            inverse: "false", //排序
            axisLabel: {
              show: true,
              inside: false,
              textStyle: {
                color: "#b3ccf8",
                fontSize: "25",
                fontFamily: "PingFangSC-Regular"
              },
              formatter: function(val) {
                return `${val}`;
              }
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: valueData
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            label: {
              normal: {
                show: false,
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
                      color: "#bed877" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#ffad41" // 100% 处的颜色
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

      myChart.setOption(option);
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
