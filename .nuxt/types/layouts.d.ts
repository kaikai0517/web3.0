import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "/Users/chenkaiming/Desktop/web3.0/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}