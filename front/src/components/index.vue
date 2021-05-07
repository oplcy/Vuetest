<template>
	<div>
		<el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="item in items" :key="item">
            	<img v-bind:src="item" alt="">
    		</el-carousel-item>
  		</el-carousel>

  		<el-row>
		  	<el-col :span="11">
		  		<div class="grid-content">
		  			<el-card class="box-card" style="height:300px">
					  	<div slot="header" class="clearfix">
					    	<span>最新活动</span>
					    	<!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
					  	</div>
				  		<div v-for="a in activities"  class="text item dash" :key="a.id">
					    	<a href="javascript:void(0)">{{a.name}}  <span style="float:right">{{a.create_time}}</span></a>
					  	</div>
					</el-card>
		  		</div>
			</el-col>
			<el-col :span="2">&nbsp;</el-col>
		  	<el-col :span="11">
		  		<div class="grid-content">
		  			<el-card class="box-card" style="height:300px">
					  	<div slot="header" class="clearfix">
					    	<span>社团</span>
					    	<!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
					  	</div>
				  		<div v-for="club in clubs" class="text item dash" :key="club.id">
					    	<a href="javascript:void(0)">{{club.name}} <span style="float:right">{{club.create_time}}</span></a>
					  	</div>
					</el-card>
		  		</div>
		  	</el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'index',
		data () {
      		return {
        		items: [
        			"/static/imgs/1.jpg",
        			"/static/imgs/2.jpg",
        			"/static/imgs/3.jpg"
        		],
        		clubs: [],
        		activities: []
      		}
    	},
    	methods: {
    		fetchData (){
    			this.func.ajaxGet(this.api.activityList, {}, res => {
                    this.activities = res.data.activities;
                });

                this.func.ajaxGet(this.api.clubList, {}, res => {
                    this.clubs = res.data.clubs;
                });
    		}
    	},
    	created () {
            this.fetchData();
        }
	}
</script>

<style>
	.clearfix:after {
	    clear: both
  	}
  	.dash{
  		border-bottom: 1px dashed
  	}
</style>