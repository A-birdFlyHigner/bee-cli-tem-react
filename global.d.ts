/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-15 20:40:41
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-18 19:29:48
 */
declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare namespace JSX {
  interface IntrinsicElements {
    import: React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
  }
}

// @ts-ignore
declare const process: {
  env: {
    [key: string]: any
  }
}
