const mixins = {
	methods: {
		changePop(key = 'isPop') {
			this[key] = !this[key];
		},
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
		getTime(time) {
			var mon = time.getMonth() + 1;
			var month = mon >= 10 ? mon : '0' + mon;
			var d = time.getDate();
			var day = d >= 10 ? d : "0" + d;
			var h = time.getHours();
			var hour = h >= 10 ? h : "0" + h;
			var m = time.getMinutes();
			var minute = m >= 10 ? m : "0" + m;
			var s = time.getSeconds();
			var second = s >= 10 ? s : "0" + s;
			return `${time.getFullYear()}-${month}-${day}`;
		}
	}
}

export default mixins;