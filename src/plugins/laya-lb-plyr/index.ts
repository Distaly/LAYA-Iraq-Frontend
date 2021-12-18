/**
 * Filename: index.ts
 * Use: expose Plyr to $laya
 * Creator: core
 * Date: unknown
 * Dependencies: vue
 */

import _Vue from 'vue'

import _create from './create.vue'
import _edit from './edit.vue'
import _view from './view.vue'

export default {
  install(Vue: typeof _Vue, options?: any): void {
    Vue.$laya.registerLB(
      'laya-plyr', 
      'BlockPlyr', 
      'layaPlyr',
      'fab fa-youtube', 
      {
        new: _create,
        //@ts-ignore
        view: _view,
        edit: _edit
      }
    )
  }
}