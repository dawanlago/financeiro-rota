<template>
  <div id="trips">
    <h1 class="title text-center">Lista de veículos</h1>
    <div class="content">
      <button class="btn btn-primary" @click="handleNewCar()">Novo veículo</button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Placa</th>
            <th scope="col">Marca</th>
            <th scope="col">Modelo</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in cars" :key="car.id">
            <th>{{ car.data().licensePlate }}</th>
            <td>{{ car.data().assembler }}</td>
            <td>{{ car.data().model }}</td>
            <td>
              <i class="fa-regular fa-pen-to-square"></i>
              <i class="fa-solid fa-ban"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { collection, getDocs } from '@firebase/firestore'

export default {
  name: 'Trips',
  data () {
    return {
      cars: []
    }
  },
  methods: {
    handleNewCar () {
      this.$router.push('/new-car')
    }
  },
  async mounted () {
    const querySnapshot = await getDocs(collection(db, 'cars'))
    querySnapshot.forEach((doc) => {
      this.cars.push(doc)
    })
  }
}
</script>

<style lang="scss" scoped>
#trips {
  justify-content: center;
  align-items: center;
}

.content {
  margin: 0 30px;
}

.title {
  font-size: 30px;
}

.fa-regular,
.fa-solid {
  margin: 0 10px;
  text-align: center;
}

.fa-pen-to-square {
  color: var(--edit-pentil)
}

.fa-ban {
  color: var(--red)
}

.fa-circle-check {
  color: var(--green)
}

button {
  margin-bottom: 30px;
}
</style>
