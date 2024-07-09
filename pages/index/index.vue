<template>
	<view class="content">
		<view class="context">
			<view @click="goDetail(item._id)" class="item" v-for="(item,index) of listArr" :key="item._id">
				<view class="text">
					<view class="title">
						{{item.title}}
					</view>
					<view class="info">
						<text>{{item.author}}</text>
						<text class="time">{{getDatetime(index)}}</text>
						<!-- <view>{{locationed}}</view> -->
						<text>( つ•̀ω•́)つ</text>
					</view>
				</view>
				<image v-if="item.imageURL.length" :src="item.imageURL[0]"  mode="aspectFill" class="bac"></image>
				<image v-else src="/static/images/bac.jpg" mode="aspectFill" class="bac"></image>
			</view>
			<view class="edit" @click="goEdit">
				<uni-icons type="plusempty" size="30" color="#fff"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
import {onLoad,onReachBottom,onPullDownRefresh} from "@dcloudio/uni-app"
import {ref,computed} from 'vue'
let listArr = ref([]);

const goEdit = ()=>{
	uni.navigateTo({
		url:"/pages/Add/Add"
	})
}

onReachBottom(()=>{
	getData();
})

onPullDownRefresh(()=>{
	listArr.value = [];
	getData();
})
const getData = ()=>{
	uniCloud.callFunction({
		name:"getArticle",
		data:{
			skip:listArr.value.length
		}
	}).then(res => {
		listArr.value = [...listArr.value,...res.result.data];
		uni.stopPullDownRefresh();
	})
}

onLoad(()=>{
	getData();
	/* getlocation(); */
})

//()=> 回调一 (参数)=>{} 回调二
const getDatetime = computed(() => (index)=>{
	let time = listArr.value[index].posttime;
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

const goDetail = (id)=>{
	uni.navigateTo({
		url:"/pages/detail/detail?id="+id
	})
}
/* let locationed = ref("")
const getlocation = ()=>{
	uni.getLocation({
		type:"gcj02",
		geocode:true
	}).then(res=>{
		locationed.value = res.address.province
	})
} */
</script>

<style lang="less" scoped>
	.content{
		.context{
			padding:30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.item{
				padding: 20rpx 0;
				display: flex;
				text-align: justify;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #eee;
				padding-right: 10rpx;
				.text{
					flex:1;
					.title{
						font-size: 40rpx;
						color: #333;
						margin-bottom: 20rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.info{
						font-size: 28rpx;
						color: #888;
						.time{
							margin:0rpx 20rpx;
						}
					}
				}
				.bac{
					width: 260rpx;
					height:200rpx;
				}
			}
			.edit{
				width:100rpx;
				height:100rpx;
				background-color: #fc92ff;
				color:#fff;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				border-radius: 50%;
				line-height: 100rpx;
				font-size: 70rpx;
				position: fixed;
				right: 60rpx;
				bottom: 100rpx;
				box-shadow: 0 0 20rpx rgba(252,146,255,0.6);
			}
		}
	}
</style>
