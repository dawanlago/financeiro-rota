<template>
  <div>
    <h2 class="title text-center">Novo veículo</h2>
    <div class="row form-login">
      <div class="form-group mb-2 col-4">
        <input required v-model="assembler" type="text" class="form-control" placeholder="Marca">
      </div>
      <div class="form-group mb-2 col-4">

        <input required v-model="model" type="text" class="form-control" placeholder="Modelo">
      </div>
      <div class="form-group mb-2 col-2">

        <input required v-model="licensePlate" type="text" class="form-control" placeholder="Placa">
      </div>

      <button @click="handleSaveCar()" class="btn btn-primary col-2 bottom-0 end-0">
        Salvar
      </button>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { collection, addDoc } from '@firebase/firestore'
export default {
  name: 'NewCar',
  data: () => {
    return {
      model: '',
      assembler: '',
      licensePlate: ''
    }
  },
  methods: {
    async handleSaveCar () {
      try {
        const { assembler, model, licensePlate } = this
        await addDoc(collection(db, 'cars'), {
          assembler,
          model,
          licensePlate
        })
        this.$router.push('/cars')
      } catch (error) {
        console.log('Erro ao atualização:' + error.message)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.title {
  font-size: 30px;
}

.form-login {
  margin: 30px;
  display: flex;
  justify-content: center;
  align-content: flex-end;
}

.btn,
.form-control {
  height: 50px;
}

.btn {
  justify-content: center;
}
</style>
