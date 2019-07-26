const { BrowserRouter, Route, Link } = rrdm;

@mobxReact.inject(state => {
	return {
		is_login: state.store.calc_is_login,
	};
})
@gcpt
export default class AppPage {
	render() {
		const cpt_login = cpt.getRoute('login', {
			path: '/login',
		});
		const redirect_login = <rrdm.Redirect to={{ pathname: '/login' }} />;
		const allow_webaccess = !this.props.is_login;
		if (allow_webaccess) {
			return (
				<rrdm.Switch>
					{cpt_login}
					{redirect_login}
				</rrdm.Switch>
			);
		}
		return (
			<rrdm.Switch>
				{cpt.getRoute('login', {
					exact: true,
					path: '/',
				})}
				{cpt.getRoute('main', {
					path: '/main',
				})}
				{cpt_login}
				{cpt.getRoute('secure', {
					path: '/secure',
				})}
				{redirect_login}
			</rrdm.Switch>
		);
	}
}
