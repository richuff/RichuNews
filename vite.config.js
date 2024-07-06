import uni from '@dcloudio/vite-plugin-uni';
import {defineConfig} from 'vite'

//导入全局资源
export default defineConfig({
	plugins:[
		uni(),
	]
})