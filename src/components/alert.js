export const Alert = {
  methods: {
    alertError (msg) {
      this.$q.notify({
        message: msg,
        timeout: 4000, // in milliseconds; 0 means no timeout
        type: 'negative',
        color: 'negative',
        textColor: 'white', // if default 'white' doesn't fits
        icon: 'warning',
        position: 'bottom' // 'top', 'left', 'bottom-left' etc
      })
    },
    alertSuccess (msg) {
      this.$q.notify({
        message: msg,
        timeout: 4000, // in milliseconds; 0 means no timeout
        type: 'positive',
        color: 'positive',
        textColor: 'white', // if default 'white' doesn't fits
        icon: 'thumb_up',
        position: 'bottom' // 'top', 'left', 'bottom-left' etc
      })
    }
  }
}
