const fs = require("fs");
const md5 = require("md5");

const cssRegex = "/\\.css$/";

const fileHashMemo = {};

function getFileHash(filepath) {
	if (fileHashMemo[filepath]) {
		return fileHashMemo[filepath];
	}
	const contentHash = md5(fs.readFileSync(filepath, "utf8"));
	fileHashMemo[filepath] = contentHash.substr(contentHash.length - 5);
	return fileHashMemo[filepath];
}

function getComponentName(resourcePath) {
	if (typeof resourcePath !== "string") {
		return "";
	}
	const componentNameAndStyleIndex = resourcePath.indexOf("stdui-styles");
	const componentNameAndStyle = resourcePath.slice(
		componentNameAndStyleIndex+13,
	);
	const styleIndex = componentNameAndStyle.indexOf("styles");
	const componentName = componentNameAndStyle.slice(0, styleIndex-1);
	return componentName;
}

function generateScopedName(localName, resourcePath) {
	const componentName = getComponentName(resourcePath);
	const contentHash = getFileHash(resourcePath);
	return `stdui-${componentName}_${localName}_${contentHash}`;
}

module.exports = {
	stories: ["../packages/**/stories/*.tsx"],
	addons: [
		{
			name:"@storybook/addon-essentials",
			options:{
				backgrounds:false
			}
		}
	],
	webpackFinal: async (config) => {
		const {module = {}} = config;
		const cssRule = config.module.rules.find((r) =>
			r.test.toString() === cssRegex
		);

		return {
			...config,
			module: {
				...module,
				rules: [
					...config.module.rules.filter((r) => r.test.toString() !== cssRegex),
					{
						...cssRule,
						exclude: /\.css$/,
					},
					{
						...cssRule,
						test: /\.css$/,
						use: cssRule.use.map((u) => {
							if (u && u.loader && u.loader.includes("css-loader")) {
								return {
									...u,
									options: {
										...u.options,
										modules: {
											getLocalIdent: (context,_, localName) => {
												return generateScopedName(
													localName,
													context.resourcePath,
												);
											},
										},
									},
								};
							}
							return u;
						}),
					},
				],
			},
		};
	},
};
