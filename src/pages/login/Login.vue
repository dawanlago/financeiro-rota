<template>
  <form class="form-login" @submit.prevent="doLogin()">
    <div class="card">
      <div class="card-header text-center">
        <h1 class="mb-0">Login</h1>
      </div>
      <div class="card-body">
        <div class="form-group mb-2">
          <input required v-model="email" type="email" class="form-control" placeholder="E-mail">
        </div>
        <div class="form-group mb-2">
          <input required v-model="password" type="password" class="form-control" placeholder="Senha">
        </div>
        <button class="btn btn-primary w-100">
          <i class="fa fa-sign-in"></i>
          Entrar
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'Login',
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async doLogin () {
      const { email, password } = this
      const auth = getAuth()
      try {
        signInWithEmailAndPassword(auth, email, password).then(res => {
          this.$router.push('/')
        }).catch(error => {
          console.log(error)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.form-login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    width: 40%;
    color: var(--darker);

  }

  h1 {
    font-size: 18pt;
  }
}
</style>
