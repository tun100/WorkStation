import { message, Button } from 'antd';
var { observable, computed, action, flow } = mobx;
var { observer } = mobxReact;

class GlobalStore {
	@observable timestamp = utils.now();
	@observable login_info = {
		is_login: false,
		user_info: {
			username: null,
			password: null,
		},
		login_time: null,
	};

	@observable is_redirect_main = false;

	@computed get calc_is_login() {
		return this.login_info.is_login;
	}

	action_login = utils.flow(function*(userinfo) {
		var { info } = utils;
		// utils.log(userinfo);
		if (info.user === userinfo.username && info.password === userinfo.password) {
			utils.log('login success');
			message.success(`鉴权成功，正跳转主应用中`);
			utils.store.login_info = _.merge({}, utils.store.login_info, {
				is_login: true,
				user_info: {
					...userinfo,
				},
				login_time: utils.now(),
			});
			utils.store.is_redirect_main = true;
		} else {
			utils.log('login failed');
			message.error(`鉴权失败`);
		}
	});
}

const store = new GlobalStore();

// auto refresh timestamp pre second
setInterval(() => {
	store.timestamp = utils.now();
}, 1000);

export default store;
