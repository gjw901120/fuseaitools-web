/**
 * 按 File 引用缓存已上传 URL，避免用户删减列表后剩余文件再次触发上传。
 */
export function useFileUploadUrlCache () {
  const cache = new WeakMap()

  /**
   * @param {File[]|File|null|undefined} files
   * @param {(need: File[]) => Promise<string[]>} uploadFn 仅上传尚未缓存的 need；返回与 need 等长的 URL 数组
   * @returns {Promise<string[]>} 与 files 列表顺序、长度一致
   */
  const getUrlsForFiles = async (files, uploadFn) => {
    if (files == null) return []
    const list = Array.isArray(files) ? files : [files]
    if (list.length === 0) return []
    const need = []
    for (const f of list) {
      if (f && !cache.has(f)) need.push(f)
    }
    if (need.length > 0) {
      const uploaded = await uploadFn(need)
      if (!Array.isArray(uploaded)) {
        throw new Error('Invalid upload response')
      }
      if (uploaded.length !== need.length) {
        throw new Error('Upload response length mismatch')
      }
      need.forEach((f, i) => {
        const u = uploaded[i]
        if (u != null && u !== '') cache.set(f, u)
      })
    }
    return list.map(f => {
      if (!f) return ''
      return cache.get(f) ?? ''
    })
  }

  return { getUrlsForFiles }
}
