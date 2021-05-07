<template>
	<div style="width:60%;text-align:center;margin:0 auto;">
		<el-row>
			<el-col :span="22">
				<el-input type="text" v-model="form.context"></el-input>
			</el-col>
			<el-col :span="2" >
				<el-button
                        type="info"
                        style="width:100%;"
                        @click="send()">发布
                    </el-button>
			</el-col>
		</el-row>
		<br/>
		<el-row>
			<div class="grid-content">
	  			<el-card class="box-card" style="height:300px">
				  	<div slot="header" style="text-align:center;">
				    	<span>留言面板</span>
				    	<!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
				  	</div>
			  		<div v-for="word in words" class="text item" :key="word.id">
				    	<span style="float:left">用户{{word.user_id}}:{{word.context}}</span>
				    	<span style="float:right">{{word.create_time}}</span>
				    	<br/>
				  	</div>
				</el-card>
	  		</div>
		</el-row>
	</div>
</template>


<script type="text/javascript">
	export default {
		name: 'word',
		data () {
      		return {
        		form: {
        			context: '',
        			user_id: ''
        		},

        		words: []
      		}
    	},
    	computed: {
            user () {
                return this.$store.state.user;
            }
        },
    	methods: {
    		fetchData (){
    			this.func.ajaxGet(this.api.wordList, {}, res => {
                    this.words = res.data.words;
                    this.load = false;
                });
    		},
    		send (){
				if (!this.form.context) {
                    this.$message.warning('请填写留言内容');
                    return;
                }
    			this.form.user_id = this.user.user_id;
    			this.func.ajaxPost(this.api.wordAdd, this.form, res => {
                    if (res.data.code === 200) {
                        this.$message.success('发布留言成功');
                        this.form.context = '';
                        this.fetchData();
                    }
                });
    		}
    	},
    	created () {
            this.fetchData();
        }
	}
</script>