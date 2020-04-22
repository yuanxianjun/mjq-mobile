<template>
  <div id="index">
    <div class="container">
      
        <div class="header"></div>
        <!-- 今日接单情况 -->
        <div class="todayStatus">
          <div class="today-label"></div>
          <div class="today-content">
            <div class="tc-left">
              <div class="tcl-lable">{{todayData.receive}}</div>
              <div class="tcl-con">
                <img src="./assets/img/numText.png" />
              </div>
            </div>
            <div class="tc-right">
              <div class="tcl-lable">{{todayData.send}}</div>
              <div class="tcl-con">
                <img src="./assets/img/numText2.png" />
              </div>
            </div>
          </div>
        </div>
        <!-- 各村接单量 -->
        <div class="villageNum">
          <div class="vn-label blockTitle"></div>
          <div class="vn-content">
            <echarts-village ref="todayVillage"></echarts-village>
          </div>
        </div>
        <!-- 各部门接单量 -->
        <div class="villageNum">
          <div class="dn-label"></div>
          <div class="vn-content">
            <echarts-department ref="echartsDepartment" :department="todayData.departmentList"></echarts-department>
          </div>
        </div>

        <div class="ym">
          <div class="ym-btn">
            <div ref="btn-y" class="btn-y btn" @click="yearAndMonth('true')">各村“三率”情况 (本年)</div>
            <div ref="btn-m" class="btn-m btn" @click="yearAndMonth('false')">查看本月情况</div>
          </div>
          <!-- 村或者部门的 前5名 -->
          <div class="topFive">
            <div class="one">
              <span>{{dataVillage[0] && dataVillage[0].name }}</span>
            </div>
            <div class="two">
              <span>{{dataVillage[1] && dataVillage[1].name}}</span>
            </div>
            <div class="three">
              <span>{{dataVillage[2] && dataVillage[2].name}}</span>
            </div>
            <div class="four">
              <span>{{dataVillage[3] && dataVillage[3].name}}</span>
            </div>
            <div class="five">
              <span>{{dataVillage[4] && dataVillage[4].name}}</span>
            </div>
          </div>
        </div>

        <!-- 三率表格 -->
        <el-table class="tableStyle" :data="dataVillage" :cell-class-name="styleMethod" stripe>
          <el-table-column type="index" label=" " align="center" width="60" :index="indexMethod"></el-table-column>
          <el-table-column prop="name" label="村及社区名称" header-align="left" align="left" width="220"></el-table-column>
          <el-table-column prop="total" label="综合三率" header-align="right" align="right">
            <template slot-scope="scope">
              <span style="font-weight:bold;">{{ scope.row.total }}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="solve" label="解决率" header-align="right" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.solve }}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="satisfaction" label="满意率" header-align="right" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.satisfaction }}%</span>
            </template>
          </el-table-column>
          <el-table-column prop="response" label="响应率" header-align="right" align="right">
            <template slot-scope="scope">
              <span>{{ scope.row.response }}%</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="moreBtn">
          <el-button v-show="!showMore" plain @click="handleMoreData(true)">
            展开查看全部数据
            <i class="el-icon-d-arrow-left el-icon--right"></i>
          </el-button>
          <el-button v-show="showMore" plain @click="handleMoreData(false)">
            收起数据
            <i class="el-icon-d-arrow-right el-icon--right"></i>
          </el-button>
        </div>
      

      <!-- 主管领导三率 -->
      <div class="bagStatu">
        <div class="bag-label"></div>
        <div class="bag-content">
          <el-table class="tableStyle" :data="dataArea" :cell-class-name="styleMethod2" stripe>
            <el-table-column type="index" align="center" label=" " width="60" :index="indexMethod2"></el-table-column>
            <el-table-column
              prop="leader"
              label="主管领导"
              header-align="left"
              align="left"
              width="180"
            >
              <template slot-scope="scope">
                <div>
                  {{scope.row.leader}}
                  <br />
                  <br />
                  {{scope.row.average}}%
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="nameList" label="部门/村(社区)名" header-align="center" align="center">
              <template slot-scope="scope">
                <template v-for="(item,index) in scope.row.nameList">
                  <div style="line-height:60px;height:60px;" :key="index+'s'">{{item}}</div>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="numList" label="综合三率" header-align="center" align="center">
              <template slot-scope="scope">
                <template v-for="(item,index) in scope.row.numList">
                  <div style="line-height:60px;height:60px;" :key="index+'m'">{{item}}%</div>
                </template>
              </template>
            </el-table-column>
          </el-table>
          <div class="moreBtn">
            <el-button v-if="!showMoreArea" plain @click="MoreAreaData(true)">
              展开查看全部数据
              <i class="el-icon-d-arrow-left el-icon--right"></i>
            </el-button>
            <el-button v-if="showMoreArea" plain @click="MoreAreaData(false)">
              收起数据
              <i class="el-icon-d-arrow-right el-icon--right"></i>
            </el-button>
          </div>
        </div>
      </div>

      <!-- 今年接单情况 -->
      <div class="yearStat">
        <div class="year-label"></div>
        <div class="today-content">
          <div class="tc-left">
            <div class="tcl-lable">{{yearData.receive}}</div>
            <div class="tcl-con">
              <img src="./assets/img/numText.png" />
            </div>
          </div>
          <div class="tc-right">
            <div class="tcl-lable">{{yearData.send}}</div>
            <div class="tcl-con">
              <img src="./assets/img/numText2.png" />
            </div>
          </div>
        </div>
      </div>

      <!-- 本年12345派单数据 -->
      <div class="collect">
        <div class="col-label"></div>
        <div class="col-content">
          <div class="col-header">
            <div class="activeHeader btn">{{activeName.topName}}</div>
            <div class="idleHeader btn" @click="yearOrder()">{{activeName.noactiveName}}</div>
          </div>
          <div class="col-title">
            <div class="col-title-left">{{activeName.headerName}}</div>
            <div class="col-title-right">接单数量</div>
          </div>
          <echarts-num :chartData="yearData.countrysideList" ref="year12345"></echarts-num>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echartsVillage from "./components/echart-village";
import echartsDepartment from "./components/echart-department";
import echartsNum from "./components/echart-12345";

export default {
  name: "index",
  components: {
    echartsVillage,
    echartsDepartment,
    echartsNum
  },
  data() {
    return {
      leftBar: "url(" + require("./assets/img/left-bar.png") + ")",
      rightBar: "url(" + require("./assets/img/right-bar.png") + ")",
      bool_year: true,
      dataVillage: [],
      dataArea: [],
      showMore: false,
      showMoreArea: false,
      tableData: [],
      todayData: {
        receive: 0,
        send: 0,
        countrysideList: [],
        departmentList: []
      },
      yearData: {
        receive: 0,
        send: 0,
        countrysideList: [],
        departmentList: []
      },
      situationData: {
        year: [],
        month: [],
        yearAreaList: [],
        monthAreaList: []
      },
      activeName: {
        noactiveName: "部门派单数量",
        headerName: "村(社区)名称",
        topName: "村/社区派单数量"
      }
    };
  },
  created() {},
  mounted() {
    this.getDistributorYear();
    this.getTodayData();
    this.getSituation();
    this.yearAndMonth("true");
  },
  updated() {},
  methods: {
    // 年月切换
    yearAndMonth(value) {
      this.bool_year = value;
      if (value == "true") {
        this.$refs["btn-y"].style.backgroundImage = this.leftBar;
        this.$refs["btn-m"].style.backgroundImage = "";

        this.handleMoreData(false);
        this.MoreAreaData(false);
      } else {
        this.$refs["btn-y"].style.backgroundImage = "";
        this.$refs["btn-m"].style.backgroundImage = this.rightBar;

        this.handleMoreData(false);
        this.MoreAreaData(false);
      }
    },
    // 切换部门和社区派单量
    yearOrder() {
      if (this.activeName.topName == "村/社区派单数量") {
        this.activeName = {
          topName: "部门派单数量",
          headerName: "部门名称",
          noactiveName: "村/社区派单数量"
        };
        var data = Array.from(this.yearData.departmentList)
       data=  data.filter(item => {
        	let key = Object.keys(item)[0]        	
        	       		
        		return (key != '主要领导' && key !== '主管领导')	
        	    	
        })
		console.log(data)
        this.$refs.year12345.setOption(data);
      } else {
        this.activeName = {
          topName: "村/社区派单数量",
          headerName: "村(社区)名称",
          noactiveName: "部门派单数量"
        };
        this.$refs.year12345.setOption(this.yearData.countrysideList );
      }
    },
    // 今日接派单情况和今日各村、各部门接单统计
    getTodayData() {
      this.axios.get("/distributor-day").then(response => {
        this.todayData = response.data.data;
        if (this.todayData.countrysideList) {
          this.$refs.todayVillage.setOption(this.todayData.countrysideList);
        }
        if (this.todayData.countrysideList) {
          this.$refs.echartsDepartment.setOption(this.todayData.departmentList);
        }
      });
    },
    // 各村”三率”情况（本年、本月）
    getSituation() {
      this.axios.get("/situation").then(response => {
        this.situationData = response.data.data;
        this.handleMoreData(false);
        this.MoreAreaData(false);
      });
    },
    // 本年接派单情况和本年各村、各部门派单统计
    getDistributorYear() {
      this.axios.get("/distributor-year").then(response => {
        this.yearData = response.data.data;
        this.$refs.year12345.setOption(this.yearData.countrysideList);
      });
    },

    /**
     * 村及社区展开更多
     * bool  为true时候代表展开全部 为false =>> 展示前10项
     */
    handleMoreData(bool) {
      this.showMore = bool;
      this.dataVillage = [];

      if (bool == false) {
        let arr1 = [],
          arr2 = [];
        if (this.bool_year == "true") {
          let len = this.situationData.year.length;
          arr1 = this.situationData.year.slice(0, 7);
          arr2 = this.situationData.year.slice(-3);
          this.dataVillage = [...arr1, ...arr2];
        } else {
          let len = this.situationData.month.length;
          arr1 = this.situationData.month.slice(0, 7);
          arr2 = this.situationData.month.slice(-3);
          this.dataVillage = [...arr1, ...arr2];
        }
      } else {
        if (this.bool_year == "true") {
          this.dataVillage = this.situationData.year;
        } else {
          this.dataVillage = this.situationData.month;
        }
      }
    },
    /**
     * 主管领导展开更多
     * bool  为true时候代表展开全部 为false =>> 展示前10项
     */
    MoreAreaData(bool) {
      this.showMoreArea = bool;

      this.dataArea = [];
      if (bool == false) {
        let arr1 = [],
          arr2 = [];
        if (this.bool_year == "true") {
          arr1 = this.situationData.yearAreaList.slice(0, 3);
          arr2 = this.situationData.yearAreaList.slice(-3);
          this.dataArea = [...arr1, ...arr2];
        } else {
          arr1 = this.situationData.monthAreaList.slice(0, 3);
          arr2 = this.situationData.monthAreaList.slice(-3);
          this.dataArea = [...arr1, ...arr2];
        }
      } else {
        if (this.bool_year == "true") {
          this.dataArea = this.situationData.yearAreaList;
        } else {
          this.dataArea = this.situationData.monthAreaList;
        }
      }
    },
    styleMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex);
      if (rowIndex == 0 && columnIndex == 0) {
        return "circleRed";
      }
      if (rowIndex == 1 && columnIndex == 0) {
        return "circleYellow";
      }
      if (rowIndex == 2 && columnIndex == 0) {
        return "circleGreen";
      }

      if (rowIndex == 7 && columnIndex == 0 && this.showMore == false) {
        return "downArrow";
      }
      if (rowIndex == 8 && columnIndex == 0 && this.showMore == false) {
        return "downArrow";
      }
      if (rowIndex == 9 && columnIndex == 0 && this.showMore == false) {
        return "downArrow";
      }
    },
    styleMethod2({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex);
      if (rowIndex == 0 && columnIndex == 0) {
        return "circleRed";
      }
      if (rowIndex == 1 && columnIndex == 0) {
        return "circleYellow";
      }
      if (rowIndex == 2 && columnIndex == 0) {
        return "circleGreen";
      }

      if (rowIndex == 3 && columnIndex == 0 && this.showMoreArea == false) {
        return "downArrow";
      }
      if (rowIndex == 4 && columnIndex == 0 && this.showMoreArea == false) {
        return "downArrow";
      }
      if (rowIndex == 5 && columnIndex == 0 && this.showMoreArea == false) {
        return "downArrow";
      }
    },
    // 只显示前5名
    indexMethod(index) {
      if (index < 5) {
        return index + 1;
      }
    },
    // 只显示前5名
    indexMethod2(index) {
      if (index < 3) {
        return index + 1;
      }
    }
  }
};
</script>
<style lang="scss" >
@import url(./assets/index.scss);
</style>