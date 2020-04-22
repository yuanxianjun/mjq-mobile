<template>
	<div id="index">
		<div class="container">
			<div class="top">

				<div class="topHeader">
					SSDB System
				</div>
				
				<div class="person">
					<i class="el-icon-user-solid"></i>
					<a class="" href="http://127.0.0.1:5000/profile//user_info">{{name}}</a>
				</div>
				<a  class="rootPage" href="http://127.0.0.1:5000">首页</a>
				
			</div>

			<div class="content">
				<div class="left">
					<h5 class="letHeader">Databases</h5>
					<!--<el-cascader-panel :options="menuList"></el-cascader-panel>-->
					<el-menu background-color="#545c64" text-color="#fff" active-text-color="#409EFF" default-active="1" class="el-menu-vertical-demo"
						@open="handleOpen"
						 @close="handleClose"
						 >
						<template v-for="(item,index) in menuList">
							<el-submenu :index="index+''">
								<template slot="title">
									<i class="el-icon-coin"></i>
									<span>{{item.name}}</span>
								</template>
								<template v-for="(item,itemIndex) in item.children">
									<el-submenu  :index="index +'-' +itemIndex">
										<template slot="title">
											<i class="el-icon-document-copy"></i>
											<span>{{item}}</span>
										</template>
									</el-submenu>
								</template>

							</el-submenu>
						</template>

					</el-menu>
				</div>
				<div class="right">
					<div class="sqlInput">
						<div class="sql-header">
							<h2>SQL Command</h2>
							<el-select class="myselect" v-model="selectValue" placeholder="请选择">
								<el-option v-for="item in slectOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>

						<el-input type="textarea" :rows="5" placeholder="请输入内容 例子：insert into news(title,name,content,numbers) values ('xxx','xxx','xxx','xxx')     select * from news
							
							" v-model="sqlText">
							
						</el-input>
						<p style="color:red;">请严格按照sql语句格式输入</p>
						<div class="exBtn">

							<el-upload
							  class="upload-demo"
							  action="http://127.0.0.1:5000/news/send_sqlfile/"														 
							 >
							  <el-button  type="primary">上传文件</el-button>
							</el-upload>
							<el-button type="primary" @click="getTable()">execute</el-button>
						</div>

					</div>
					<div class="table1 table">
						<div class="tb-header">
							<h2> Plain Text</h2>
							<div class="delBtn">
								<el-button type="primary" icon="el-icon-delete" @click="clear('plain')">clear</el-button>
							</div>
						</div>
						<el-table :data="plain_text" stripe max-height="220" border style="width: 100%">
							<el-table-column   type="index" width="180" align="center">
							</el-table-column>
							<el-table-column prop="title" label="标题" align="center" width="180">
							</el-table-column>
							<el-table-column prop="name" label="名称" align="center" width="180">
							</el-table-column>
							<el-table-column prop="content" align="center" label="内容">
							</el-table-column>
							<el-table-column prop="numbers" align="center" label="numbers">
							</el-table-column>
						</el-table>
					</div>
					<!--Cipher-->
					<div class="table2 table">
						<div class="tb-header">
							<h2> Cipher Text</h2>
							<div class="delBtn">
								<el-button type="primary" icon="el-icon-delete" @click="clear('cipher')" >clear</el-button>
							</div>
						</div>
						<el-table :data="cipher_text" stripe max-height="220" border style="width: 100%">
							<el-table-column prop="id" label="" width="180" align="center">
							</el-table-column>
							<el-table-column prop="title" label="标题" align="center" width="180">
							</el-table-column>
							<el-table-column prop="name" label="名称" align="center" width="180">
							</el-table-column>
							<el-table-column prop="content" align="center" label="内容">
							</el-table-column>
							<el-table-column prop="numbers" align="center" label="numbers">
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "index",
		components: {},
		data() {
			return {
				name:"",
				dbname:"",				
				sqlText: "",
				//菜单按钮
				menuList: [],
				slectOptions: [{
					value: '1',
					label: 'sha256加密'
				}, {
					value: '2',
					label: 'AES加密'
				}, {
					value: '3',
					label: 'DES加密'
				}, {
					value: '4',
					label: 'RSA加密'
				}],
				selectValue: '1',
					"cipher_text": [],					
					"plain_text": [],				
			}
		},
		created() {

			this.login();
		},
		mounted() {

			this.getDataBase();
//			this.getTable();
//			this.detailMenuList();
		},
		updated() {},
		methods: {
//			判断是否成功登录
			login(){
				this.axios.get("/passport/allow_login/").then(response => {
					let code = response.data.code;
					console.log(response)
					
					if(code == '200'){
						this.name = response.data.name;
					}else {
						this.$message({
					          message: '请先登录',
					          type: 'warning'
					        });
						window.location.href="http://127.0.0.1:5000/"
					}
				});
			},
			 handleOpen(key, keyPath) {
		        this.dbname = this.menuList[key].name;
		       	this.getTableNames()
		      },
		      handleClose(key, keyPath) {
		        console.log(key, keyPath);
		      },
			//清空数据
			clear(name){
				if(name=="plain"){
					this.plain_text = [];
				}
				if(name == "cipher"){
					this.cipher_text = [];
				}
			},
			//获取table数据
			getTable() {
				console.log(this.dbname,this.selectValue,this.sqlText)
				
				this.axios.post("/news/send_sql/",{
					type:this.selectValue * 1,
					data:this.sqlText,
					database:this.dbname
				}).then(response => {
					this.plain_text = response.data.plain_text;
					this.cipher_text =  response.data.cipher_text;
				});
				
				if(this.sqlText.includes("insert")){
					this.axios.post("/news/send_sql/",{
						type:this.selectValue * 1,
							data:'select * from news',
							database:this.dbname
						}).then(response => {
							this.plain_text = response.data.plain_text;
							this.cipher_text =  response.data.cipher_text;
						});
					}
			},
			//获取库名列表
			getDataBase() {
				this.axios.get("/news/show_database/").then(response => {
					this.menuList = response.data.data;
					this.detailMenuList();
				});
			},
			//获取表名
			getTableNames() {
//				this.detailMenuList(
//					 [
//				        "alembic_version",
//				        "info_user",
//				        "news"
//				    ]
//				)
				this.axios.get("/news/show_table/",{
					params: {
						      database: this.dbname
						    }
				}).then(response => {
					let tableList = response.data.data;
					console.log(tableList)
					this.detailMenuList(tableList)
				});
				
				
			},
			//处理左侧列表
			detailMenuList(tableNames){
				let  data = this.menuList.map(item=>{
					let children=[]
//					if(this.dbname == 'puzzle'){
//						children = ["alembic_version",
//							        "info_user",
//							        "news"]
//					}
					if(item || item.name === this.dbname){
						children = tableNames						
					}
						return {
							name:item.name || item,
							children:children
						}
					
					
				})				
				this.menuList = data;
			}						
		}
	};
</script>
<style lang="scss">
	@import url(./assets/index.scss);
</style>