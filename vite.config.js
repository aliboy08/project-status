import mkcert from 'vite-plugin-mkcert'

export default {
	server: {
        https: true,
        cors: true,
    },
	plugins: [
        mkcert(),
	],
	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			api: 'modern-compiler',
	// 		},
	// 	},
	// },
	resolve: {
		alias: {
			modules: '/src/modules',
			components: '/src/components',
            css: '/src/css',
			data: '/data',
			src: '/src',
		},
	},
}
