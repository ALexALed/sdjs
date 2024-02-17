import loadModule from './loadModuleOnly.js'

const result = loadModule(process.argv[2])
console.log(`result.publicValue is ${result.publicValue}`)
console.log(`result.privateValue is ${result.privateValue}`)
console.log(result.publicFunction('main'))
