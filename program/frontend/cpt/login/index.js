const { observer, inject } = mobxReact;
import myless from './index.less';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const { Header, Content, Footer } = Layout;

@Form.create({ name: 'ok' })
@gcpt
class WrapperLoginForm {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				utils.store.action_login(values);
			}
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className={myless['login-form']}>
				<Form onSubmit={this.handleSubmit}>
					<Form.Item>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: '请输入您的用户名!' }],
						})(
							<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder={`请输入用户名(${utils.info.user})`}
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入您的密码!' }],
						})(
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder={`请输入密码(${utils.info.password})`}
							/>
						)}
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

@inject(state => {
	return {
		is_login: state.store.calc_is_login,
		is_redirect_main: state.store.is_redirect_main,
	};
})
@observer
@gcpt
export default class LoginPage {
	render() {
		utils.log('login rendering', this);
		if (this.props.is_login && this.props.is_redirect_main) {
			// quick update redirect main by defer, cannot change store value when rendering
			utils.defer(() => {
				utils.store.is_redirect_main = false;
			}, 0);
			return <rrdm.Redirect to="/main" />;
		}
		return (
			<Layout>
				<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
					<div className="logo" />
					<div className={myless['gapp-title']}>{utils.info.title}-请先登录</div>
				</Header>
				<Content style={{ padding: '0 50px', marginTop: 64 }}>
					<WrapperLoginForm />
				</Content>
				<Footer style={{ textAlign: 'center' }}>©2019 CopyRight 版权所有</Footer>
			</Layout>
		);
	}
}
