<template>
<view class="root" :style="{width,height}">
		<image :style="{width,height}" class="posterImg" :src="posterUrl" mode="scaleToFill"></image>
<!--		<image :style="{width,height}" class="posterImg" :src="posterUrl" mode="aspectFit"></image>-->
		<view :style="{width,height}" @click="state=!state" class="box">
			<image class="playIcon" src="@/static/app/play.png" mode="widthFix"></image>
		</view>
<!--		<video :id="videoId" :style="{height,width:state?'750rpx':'1rpx'}" @pause="state=0" @timeupdate="timeupdate" @fullscreenchange="fullscreenchange" class="video" :src="url"></video>-->
		<video :id="videoId" :style="{height,width:state?'100%':'0rpx'}" @pause="state=0" @ended="state=0"
           @timeupdate="timeupdate" @fullscreenchange="fullscreenchange"
           class="video" :src="url" :initial-time-cus="initialTimeCus" :show-progress="showProgress"
    ></video>
		<!-- <progress :style="{'top':height,width}" class="progress" :percent="currentTime?parseInt(currentTime/duration*100):0" show-info border-radius="5" active></progress> -->
</view>
</template>

<script>
	export default {
		computed:{
			posterUrl(){
				if(this.poster) return this.poster
				return this.url + '?x-oss-process=video/snapshot,t_'+(parseInt(this.currentTime*1000))+',f_jpg,w_800,m_fast'
			}
		},
		created() {
			this.videoId = Date.now() + Math.ceil(Math.random()*10000000)+"";
		},
		mounted() {
			this.VideoContext = uni.createVideoContext(this.videoId)
		},
		methods:{
			fullscreenchange(e){
				console.log(e.detail.fullScreen);
				this.state = e.detail.fullScreen
			},
			timeupdate(e){
				console.log(e.detail);
				this.duration = e.detail.duration
				this.currentTime = e.detail.currentTime
        this.$emit('timeupdate', e.detail)
      }
		},
		watch: {
			state(state, oldValue) {
				console.log(state,'state');
				if(!state){
					this.VideoContext.pause()
				}else{
					this.VideoContext.play()
					this.$nextTick(()=>{
						this.VideoContext.requestFullScreen({direction:this.direction})
            if(!this.initialTimeCusSeeked && this.initialTimeCusSeeked > 0) {
              // video 的 initial-time 会导致黑屏，不好使
              this.VideoContext.seek(this.initialTimeCus)
              this.initialTimeCusSeeked = true
            }
          })
				}
        // 传值父组件
        this.$emit('videoState', {state, duration: this.duration, currentTime:this.currentTime})
      }
		},
		data() {
			return {
				VideoContext:{},
				state:false,
				currentTime:0,
				duration:0,
				videoId:'',
        initialTimeCusSeeked: false
			};
		},
		props: {
			poster: {
				type: [String,Boolean],
				default(){
					return ''
				}
			},
      showProgress: {
        type: [Boolean],
        default(){
          return true
        }
      },
			url: {
				type: String,
				default(){
					return ''
				}
			},
			direction: {
				type: Number,
				default(){
					return 0
				}
			},
      initialTimeCus: {
        type: Number,
        default(){
          return 0
        }
      },
			width: {
				type: String,
				default(){
					return "750rpx";
				}
			},
			height: {
				type: String,
				default(){
					return "450rpx";
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
.root{
	position:relative;
	width: 750rpx;
	height: 300px;
	overflow: hidden;
}
.posterImg,.video,.box{
	display: flex;
	width: 750rpx;
	height: 300px;
	//border: solid 1px red;absolute
	position:absolute;
}
.posterImg{
	//border: solid red 1px;
}
.box{
	justify-content: center;
	align-items: center;
}
.playIcon{
	width: 100rpx;
}
</style>
