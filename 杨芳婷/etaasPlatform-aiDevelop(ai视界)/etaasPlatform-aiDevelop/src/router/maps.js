const paasMaps = [{
	path: '/index',
	name: 'index',
	component: resolve => require(["@/views/etass/index/index"], resolve)
},
{
	path: '/control',
	name: 'control',
	component: resolve => require(["@/views/etass/control/index"], resolve)
},
{
	path: '/smartPark',
	name: 'smartPark',
	component: resolve => require(["@/views/etass/smartPark/index"], resolve),
	children: [
		{
			path: 'schemeArchitecture',
			name: 'schemeArchitecture',
			component: resolve => require(["@/views/etass/smartPark/index/index"], resolve),
		},
		{
			path: 'programAdvantages',
			name: 'programAdvantages',
			component: resolve => require(["@/views/etass/smartPark/index/index"], resolve),
		},
		{
			path: 'sceneIntroduction',
			name: 'sceneIntroduction',
			component: resolve => require(["@/views/etass/smartPark/index/index"], resolve),
		},
		{
			path: 'customerCase',
			name: 'customerCase',
			component: resolve => require(["@/views/etass/smartPark/index/index"], resolve),
		}
	]
},
{
	path: '/smartFactory',
	name: 'smartFactory',
	component: resolve => require(["@/views/etass/smartFactory/index"], resolve),
	children: [
		{
			path: 'schemeConcept',
			name: 'schemeConcept',
			component: resolve => require(["@/views/etass/smartFactory/index/index"], resolve),
		},
		{
			path: 'schemeArchitecture',
			name: 'schemeArchitecture',
			component: resolve => require(["@/views/etass/smartFactory/index/index"], resolve),
		},
		{
			path: 'sceneAdvantage',
			name: 'sceneAdvantage',
			component: resolve => require(["@/views/etass/smartFactory/index/index"], resolve),
		},
		{
			path: 'productIntroduction',
			name: 'productIntroduction',
			component: resolve => require(["@/views/etass/smartFactory/index/index"], resolve),
		}
	]
},
{
	path: '/cloud',
	name: 'cloud',
	component: resolve => require(["@/views/etass/cloud/index"], resolve)
}]
export const maps = {
	paasMaps
}
