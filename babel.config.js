module.exports = function (api) {
	api.cache(true)
	return {
		presets: [
			'babel-preset-expo',
			['@babel/preset-react', { runtime: 'automatic' }]
		],
		plugins: [
			[
				'babel-plugin-root-import',
				{
					rootPathSuffix: 'app/',
					rootPathPrefix: '@/'
				}
			]
		]
	}
}
