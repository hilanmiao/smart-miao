<script>
	export default {
		globalData: {},
		onLaunch() {
			// #ifdef APP-PLUS
			// uniCloud.callFunction({
			// 	name: 'chb-check-update',
			// 	data: {
			// 		appid: plus.runtime.appid,
			// 		version: plus.runtime.version
			// 	},
			// 	success(e) {
			// 		if (e.result.isUpdate) { //需要更新
			// 			// 提醒用户更新
			// 			uni.showModal({
			// 				title: '更新提示',
			// 				content: e.result.note ? e.result.note : '是否选择更新',
			// 				success: (ee) => {
			// 					if (ee.confirm) {
			// 						plus.runtime.openURL(e.result.url);
			// 					}
			// 				}
			// 			})
			// 		}
			// 	}
			// })
			// #endif

			// #ifdef APP-PLUS
			//app关闭默认的启动 方法关闭启动图。但是这个时间不能太晚，6s 超时后依旧会主动关闭。
			setTimeout(() => {
				plus.navigator.closeSplashscreen();
			}, 2000)
			// #endif
		},
	}
</script>

<style lang="scss">
	@import "./static/app/common/iconfont.css";
	@import "plugin/uview-ui/index.scss";
	@import "common/index.scss";
</style>
