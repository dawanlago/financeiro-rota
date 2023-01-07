<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link class="nav-link active" to="/cars">Veículos</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/trips">Viagens</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/">Relatório</router-link>
    </li>
  </ul>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.nav {
  background-color: var(--lighter);
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  .nav-link {
    color: var(--dark-medium);

    &:hover {
      font-weight: 600;
    }
  }
}
</style>
