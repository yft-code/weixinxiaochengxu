var mixin = {
	methods: {
		toPath(path, meta) {
			var data = {};
			if (meta) {
				path = path.slice(1);
				data = {
					name: path,
					params: meta
				};
			} else {
				data = {
					path: path
				};
			}
			this.$router.push(data);
		},
		changeTag(item, lists) {
			if (lists.length) {
				lists.forEach(it => {
					it.isActive = false;
				})
				item.isActive = true;
				if (item.path) this.toPath(item.path);
			}
		},
		drawChart(config) {
			var yAxis = [];
			config.yAxis.forEach(item => {
				yAxis.push({
					name: item.name,
					nameTextStyle: {
						color: "rgba(231, 167, 88, 1)",
						fontSize: 14,
						fontWeight: "noraml"
					},
					type: 'value',
					max: item.max,
					interval: item.interval,
					axisLabel: {
						show: true,
						textStyle: {
							color: '#B6DCE6',
							fontWeight: "noraml",
							fontSize: '14',//字体大小
						},
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: "#D6FFFF",
							width: 1,
							type: "solid"
						}
					},
					splitLine: {//分割线配置
						show: true,
						lineStyle: {
							color: "rgba(170, 170, 170, .4)",
							width: 1,
							type: "dashed"
						}
					},
					axisTick: {
						show: false
					}
				})
			})

			var series = [];
			config.series.forEach(item => {
				series.push({
					name: item.name,
					type: item.type,
					barGap: .1,
					yAxisIndex: item.yAxisIndex ? 1 : 0,
					symbol: 'circle',
					itemStyle: {
						normal: {
							color: (typeof (item.color) == 'object') ? new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
								offset: 0,
								color: item.color[0] // 0% 处的颜色
							}, {
								offset: 1,
								color: item.color[1] // 100% 处的颜色
							}], false) : item.color
						}
					},
					data: item.data
				})
			})

			let options = {
				tooltip: {
					trigger: 'axis',
					backgroundColor: 'rgba(255, 255, 255, .8)',
					extraCssText: "width: 162px",
					position: "top",
					axisPointer: {
						crossStyle: {
							color: '#fff'
						}
					},
					formatter: function (params) {
						let res = "";
						params.forEach(item => {
							res += `${item.marker} ${item.seriesName}:
							${item.value}${(item.componentSubType == 'line') ? '%' : ''}<br>`
						})
						return res;
					}
				},
				legend: config.legend ? {
					right: 10,
					data: config.legend,
					itemHeight: 8,
					itemWidth: 5,
					textStyle: {
						fontSize: "12px",
						fontWeight: "noraml",
						color: '#fff'
					}
				} : null,
				grid: {
					top: 30,
					height: 100
				},
				xAxis: {
					type: 'category',
					axisLabel: {
						show: true,
						textStyle: {
							color: '#FFFFFF',
							fontWeight: "noraml",
							fontSize: '13',//字体大小
						},
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: "#C0FFFF",
							width: 1,
							type: "solid"
						}
					},
					axisTick: {
						show: false
					},
					data: config.xAxis
				},
				yAxis: yAxis,
				series: series
			}
			return options;
		}
	},
}

export default mixin;