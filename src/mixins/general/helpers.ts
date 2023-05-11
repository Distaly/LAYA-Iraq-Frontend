/**
 * Filename: helpers.ts
 * Use: Gives functions that are used in several components
 * Author: core
 * Since: v1.0.0
 */

export default {
  /**
   * Function categorize: push list from arr to target, if exists
   *
   * Author: core
   *
   * Last Updated: March 12, 2021
   * @param {*} arr source array
   * @param {*} target target array
   * @param {*} key the key that should be copied
   */
  categorize (arr, target, key) {
    if (!arr) return
    arr.forEach(data => {
      const { category } = data
      if (!target[category]) {
        target[category] = {}
        target[category][key] = []
      }
      if (!target[category][key]) {
        target[category][key] = []
      }
      target[category][key].push(data)
    })
  }
}

/**
 * @description strips key from object, return new object w/o key
 * @param key - the key to strip
 * @param obj - object containing `key`
 * @returns object without `key`
 */
export const stripKey = (key, obj) => {
  return (({ [key]: any, ...o }) => o)(obj)
}

/**
 * @description filter object with keys, returning an objecto only containing param keys
 * @param keys key list to filter the object
 * @param obj source object
 * @param nestedKey optional key to extract from nested objects
 * @returns object only containing keys from `keys` list
 */
export const filterObject = (keys: string[], obj: object, nestedKey?: string) => {
  if (!keys) {
    return obj
  } else {
    let filteredObj = {}
    for (const key of keys) {
      console.log('filtering for ', key)
      const objKey = typeof obj[key] === 'object'
        ? obj[key][nestedKey]
        : obj[key]
      filteredObj = { ...filteredObj, [key]: objKey }
    }
    return filteredObj
  }
}

/**
 * @description deep copy an object, intended for use with vuex references
 * @author cmc
 * @param obj - object to copy
 * @return {any} - deep copy of obj
 */
export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * @function convert kebab case string to camel case
 * @author cmc
 * @param str - string to convert
 */
export const kebabToCamel = (str) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}
