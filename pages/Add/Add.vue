<template>
	<view>
		<view class="add">
			<form class="message" @submit="OnSubmit">
				<input type="text" name="title" placeholder="请输入标题" class="title" v-model="formdata.title"/>
				<input type="text" name="author" placeholder="请输入作者" class="author" v-model="formdata.author"/>
				<textarea
					:maxlength="-1" 
					name="context" 
					class="context" 
					placeholder="请输入详细内容" 
					v-model="formdata.context">
				</textarea>
				<view class="file">
					<uni-file-picker 
						v-model="imageValue" 
						fileMediatype="image" 
						mode="grid" 
						@success="Uploadsuccess" 
						@select="select"
						@fail="fail"
					/>
				</view>
				<button form-type="reset" style="margin-top:30rpx">重置</button>
				<button class="submit" type="primary" form-type="submit" :disabled="isDisable(formdata) || !isshowbutton">发布</button>
			</form>
		</view>
	</view>
</template>

<script setup>
import {ref} from 'vue'
let detail = ref({});

const markdownText = ref('##666')
let isshowbutton = ref(true);
let imageValue = ref([]);
let formdata = ref({
	title:"",
	author:"",
	context:""
});
let imageURL = ref([]);
const OnSubmit = (e)=>{
	detail.value = e.detail.value;
	uniCloud.callFunction({
		name:"AddArticle",
		data:{
			detail:detail.value,
			imageURL:imageURL.value
		}
	}).then(res=>{
		uni.showToast({
			title:"添加成功",
			icon:'success'
		})
		uni.reLaunch({
			url:"/pages/index/index"
		})
	})
}
const isDisable = (obj)=>{
	let bools = Object.keys(obj).some((key,value)=>{
		return obj[key] == "";
	})
	return bools;
}
const Uploadsuccess =(e)=>{
	let tempFiles=e.tempFilePaths;
	uniCloud.getTempFileURL({
		fileList:tempFiles
	}).then(res=>{
		imageURL.value =res.fileList.map(item=>item.tempFileURL);
		isshowbutton.value = true;
	})
}
const select = ()=>{
	isshowbutton.value = false;
}

const fail = ()=>{
	isshowbutton.value = true;
}
</script>

<style lang="less" scoped>
	.add{
		padding: 30rpx;
		.message{
			input{
				border: 1rpx solid #eee;
				height: 80rpx;
				padding: 0 20rpx;
				margin-bottom: 20rpx;
			}
			.context{
				border: 1rpx solid #eee;
				width: 100%;
				margin:20rpx 0;
			}
			.submit{
				margin-top: 20rpx;
			}
		}
	}
</style>
