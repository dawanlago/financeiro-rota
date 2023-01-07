<template>
  <div id="app">
    <base-spinner />
    <layout-navigation v-if="isLogged" />
    <router-view />
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner'
import LayoutNavigation from './components/layout/LayoutNavigation'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  name: 'app',
  components: {
    BaseSpinner,
    LayoutNavigation
  },
  data: () => {
    return { isLogged: false }
  },
  mounted () {
    const auth = getAuth()

    onAuthStateChanged(auth, user => {
      window.uid = user ? user.uid : null
      this.isLogged = !!user

      this.$router.push({ name: window.uid ? 'home' : 'login' })

      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)
    })
  }

}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  color: var(--dark-medium);
  background-color: var(--light);
}
</style>
