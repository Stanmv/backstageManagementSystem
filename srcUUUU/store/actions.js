export default {
  addasync(context) {
    setTimeout(() => {
      context.commit('add');
    }, 1000)
  },
  addNasync(context, step) {
    setTimeout(() => {
      context.commit('addN', step)
    }, 1000)
  }
}
