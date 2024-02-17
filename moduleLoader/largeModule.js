const small = need('./moduleLoader/smallModule.js')

const large = (caller) => {
  console.log(`large from ${caller}`)
  small.publicFunction(`${caller} to large`)
}

module.exports = { large }