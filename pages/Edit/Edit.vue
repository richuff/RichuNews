<template>
	<view>
		<view class="edit" v-if="isshow">
			<form class="message">
				<input type="text" name="title" placeholder="请输入标题" class="title" v-model="detail.title"/>
				<input type="text" name="author" placeholder="请输入作者" class="author" v-model="detail.author"/>
				<textarea :maxlength="-1" name="context" class="context" placeholder="请输入详细内容" v-model="detail.context"></textarea>
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
				<button class="submit" type="primary" @click="Updated" :disabled="!isshowbutton">确定</button>
			</form>
		</view>
		<view v-else="isshow">
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
import {ref,reactive} from 'vue'
import {onLoad} from "@dcloudio/uni-app"
let id = ref("");

let imageValue =ref([]);

let detail = ref({});
let isshow = ref(false);
let isshowbutton = ref(true);
let imageURL =ref([]);
onLoad((e)=>{
	id.value = e.id;
	uniCloud.callFunction({
		name:"getarticlebyid",
		data:{
			id:id.value
		}
	}).then(res=>{
		detail.value = res.result.data[0];
		if (!detail.value.imageURL) {
			isshow.value = true;
			return;
		}
		let URL = detail.value.imageURL.map(item=>{
			return {url:item};
		});
		imageValue.value = URL;
		isshow.value = true;
	})
})

const Updated = () =>{
	if (!imageURL.value.length){
		imageURL.value = imageValue.value.map(item=>item.url);
	}
	uniCloud.callFunction({
		name:"updateArticle",
		data:{
			detail:detail.value,
			imageURL:imageURL.value
		}
	}).then(res=>{
		uni.showToast({
			title:"修改成功",
			icon:'success'
		})
		uni.navigateBack();
	})
}

const select = ()=>{
	isshowbutton.value = false;
}

const Uploadsuccess =()=>{
	imageURL.value = imageValue.value.map(item=>item.url);
	isshowbutton.value = true;
}

const fail = ()=>{
	isshowbutton.value = true;
}
</script>

<style lang="less" scoped>
	.edit{
		padding: 30rpx;
		.message{
			input{
				border: 1rpx solid #eee;
				height: 80rpx;
				padding: 0 20rpx;
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
