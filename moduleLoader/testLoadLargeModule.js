import need from './need.js'

const large = need('./moduleLoader/largeModule.js')
console.log(large.large('main'))
