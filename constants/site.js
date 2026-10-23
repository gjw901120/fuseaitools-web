/**
 * 站点主域（单一数据源）
 *
 * 线上 non-www（fuseaitools.com）会 301 到 www，因此所有对外声明的 URL
 * ——canonical、og:url、sitemap loc、llms.txt——都必须使用 www，
 * 否则搜索引擎拿到的规范地址会是一个需要跳转的地址。
 *
 * 新增页面或结构化数据时，请从本文件引入，不要硬编码域名。
 */
export const SITE_ORIGIN = 'https://www.fuseaitools.com'
