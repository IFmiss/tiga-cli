module.exports = {
  sleep: async (timer) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, timer)
    })
  }
}