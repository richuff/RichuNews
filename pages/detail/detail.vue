<template>
	<view class="detail">
		<view v-if="isshow">
			<view class="title">
				{{Article.title}}
			</view>
			<view class="info">
				<text class="author">{{Article.author}}</text>
				<text class="posttime">{{getDatetime}}</text>
			</view>
			<view class="content">
				<text style="white-space:pre-wrap;">{{Article.context}}</text>
			</view>
			<view class="imgs" v-if="Article.imageURL">
				<image class="img" v-for="(item,index) of Article.imageURL" :src="item" mode="widthFix"></image>
			</view>
			<view class="edit">
				<button size="mini" @click="GoEdit">编辑</button>
				<button type="warn" size="mini" @click="Onremove">删除</button>
			</view>
		</view>
		<view v-else="isshow">
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
import {ref,reactive,computed} from 'vue'
import {onLoad,onShow} from "@dcloudio/uni-app"
let Article = ref({});
let isshow = ref(false);
let id = ref("");
onLoad((e)=>{
	id.value = e.id;
})
onShow(()=>{
	getarticle();
})
const getarticle = ()=>{
	uniCloud.callFunction({
		name:"getarticlebyid",
		data:{
			id:id.value
		}
	}).then(res =>{
		Article.value = res.result.data[0];
		uni.setNavigationBarTitle({
			title:Article.value.title
		});
		isshow.value = true;
	}).catch(()=>{
		uni.showToast({
			icon:"error",
			title:"删除错误"
		})
		uni.reLaunch({
			url:"/pages/index/index"
		})
	})
}

const GoEdit = ()=>{
	uni.navigateTo({
		url:"/pages/Edit/Edit?id="+id.value
	})
}

const getDatetime = computed(()=>{
	let time = Article.value.posttime;
	let ntime = Date.now();
	const postdate = new Date(time);
	if (ntime - time < 60000){
		return "刚刚";
	}else if (ntime - time >= 60000 && ntime - time < 3600000){
		return Math.floor((ntime - time) / 60000) + "分钟前";
	}else if (ntime - time >= 3600000 && ntime - time < 86400000){
		return Math.floor((ntime - time) / 3600000) + "小时前";
	}else{
		return postdate.getFullYear()+'-'+(postdate.getMonth()+1)+'-'+postdate.getDate();
	}
})

const removefunction = ()=>{
	uniCloud.callFunction({
		name:"removearticle",
		data:{
			id:id.value
		}
	}).then(res=>{
		uni.showToast({
			title:"删除成功"
		})
		uni.reLaunch({
			url:"/pages/index/index"
		})
	})
}

const Onremove = ()=>{
	uni.showModal({
		content:"请确认是否删除!",
		success:res=> {
			if (res.confirm){
				removefunction();
			}
		}
	});
}
</script>

<style lang="less">
	.detail{
		padding: 30rpx;
		.title{
			font-size: 40rpx;
			color:#000;
			text-align: justify;
			line-height: 1.4em;
		}
		.info{
			font-size: 30rpx;
			color:#666;
			padding: 30rpx 0 60rpx;
			text{
				padding-right: 30rpx;
			}
		}
		.content{
			font-size:30rpx;
			line-height: 1.4em;
		}
		.edit{
			padding: 50rpx 0;
			button{
				margin-right: 50rpx;
			}
		}
		.imgs{
			padding-top:50rpx ;
			.img{
				width: 100%;
				display: block;
				margin-bottom: 30rpx;
			}
		}
	}
</style>
