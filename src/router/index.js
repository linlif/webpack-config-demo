// function importAll (r) {
//   r.keys().forEach(r);
// }

// importAll(require.context('../components/', true, /\.js$/));



function importAll (r) {
  var cache = {}
  console.log(r.keys())
  r.keys().forEach(key => cache[key] = r(key).default)
  console.log('cache', cache)
  return cache
}

export default importAll(require.context('./', false, /\.js$/))
// 在构建时(build-time)，所有被 require 的模块都会被填充到 cache 对象中。