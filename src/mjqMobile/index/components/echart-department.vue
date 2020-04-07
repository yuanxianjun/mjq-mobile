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
  props: {},
  data() {
    return {};
  },
  components: {},
  props: ["chartData"],
  created() {},
  mounted() {},
  updated() {},
  methods: {
    //渲染页面
    setOption(val) {
      let pieOne = this.$refs.pieOne;
      this.keyUnitChart = echarts.init(pieOne);
      var colorList = [
        "#69e3e9",
        "#4cd6a5",
        "#d1b43a",
        "#c95228",
        "#557ffe",
        "#204ef2",
        "#0016ff",
        "#3fb5fe",
        "#6440fd",
        "#db4d4d"
      ];
      let valueData = [];
      val.forEach((item, index) => {
        valueData.push({
          name: Object.keys(item)[0],
          value: Object.values(item)[0]
        });
      });
      let option = {
        title: {
          text: "♦",
          x: "center",
          y: "center",
          textStyle: {
            lineHeight: 25,
            color: "#1e3268",
            fontSize: 25
          }
        },
        grid: {
          top: "5%",
          containLabel: true
        },
        tooltip: {},
        legend: {
          show: false,
          orient: "vertical",
          top: "middle",
          right: "5%",
          textStyle: {
            color: "#f2f2f2",
            fontSize: 25
          },
          icon: "roundRect"
        },
        series: [
          // 主要展示层的
          {
            radius: ["35%", "48%"],
            center: ["50%", "50%"],
            type: "pie",
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex];
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 30,
                length2: 120,
                lineStyle: {
                  color: "#7e93bb"
                },
                align: "right"
              },
              color: "#000",
              emphasis: {
                show: true
              }
            },
            label: {
              normal: {
                padding: 10,
                formatter: function(params) {
                  var str = "";
                  str =
                    "{a|}\n{nameStyle|" +
                    params.name +
                    "}" +
                    "{rate|" +
                    params.value +
                    "}";
                  return str;
                },
                padding: [0, -110],
                height: 165,

                rich: {
                  a: {
                    width: 38,
                    height: 38,
                    color: "#ffffff",
                    lineHeight: 50,

                    align: "left"
                  },
                  b: {
                    width: 29,
                    height: 45,
                    lineHeight: 50,

                    align: "left"
                  },
                  c: {
                    width: 34,
                    height: 33,
                    lineHeight: 50,

                    align: "left"
                  },
                  d: {
                    width: 34,
                    height: 44,
                    lineHeight: 50,

                    align: "left"
                  },
                  e: {
                    width: 38,
                    height: 30,
                    lineHeight: 50,

                    align: "left"
                  },
                  nameStyle: {
                    fontSize: 22,
                    color: "#afcdff",
                    align: "left"
                  },
                  rate: {
                    fontSize: 30,
                    color: "#ffffff",
                    align: "left"
                  }
                }
              }
            },
            data: valueData
          },
          // 边框的设置
          {
            radius: ["26%", "35%"],
            center: ["50%", "50%"],
            type: "pie",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: "#03021c"
              }
            },
            data: [
              {
                value: 1
              }
            ]
          },
          {
            radius: ["15%", "26%"],
            center: ["50%", "50%"],
            type: "pie",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: "#021743"
              }
            },
            data: [
              {
                value: 1
              }
            ]
          },
          {
            radius: ["14%", "15%"],
            center: ["50%", "50%"],
            type: "pie",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: "#212f62"
              }
            },
            data: [
              {
                value: 1
              }
            ]
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
