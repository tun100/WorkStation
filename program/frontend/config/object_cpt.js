var loadable = require('loadable-components').default;
var cptManager = require.context('../cpt');

const basicTranslateObj = _.chain(cptManager.keys())
	.filter(x => _.endsWith(x, 'js'))
	.mapKeys(x =>
		_.chain(x)
			.split('/')
			.get(1)
			.value()
	);

const cptMap = basicTranslateObj
	.mapValues(x => {
		return cptManager(x);
	})
	.value();

const cptMapForPathInfo = basicTranslateObj
	.mapValues(x => {
		return {
			path: x,
		};
	})
	.value();

module.exports = {
	map: cptMap,
	getCpt(tagName, props = {}, children='') {
		const CrtTag = _.get(cptMap, [routeName, 'default']);
		return <CrtTag {...props}>{children}</CrtTag>;
	},
	getRoute(routeName, props = {}) {
		let moduleObj = cptMap[routeName];
		return <rrdm.Route component={_.get(moduleObj, 'default')} {...props} />;
	},
};
