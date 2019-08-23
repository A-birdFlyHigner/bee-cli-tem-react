/*
 * @Title: 标题
 * @Descripttion: 文件头部描述
 * @Author: 太一
 * @Date: 2019-08-15 20:40:41
 * @LastEditors: 太一
 * @LastEditTime: 2019-08-23 10:08:04
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

declare const BUILD_ENV: string
declare const APP_ENV: string
