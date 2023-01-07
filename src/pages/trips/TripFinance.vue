<template>
  <div>

  </div>
</template>

<script>
import { db } from '@/firebase'
import { collection, addDoc, getDocs } from '@firebase/firestore'
export default {
  name: 'TripFinance',
  data: () => {
    return {
      origin: '',
      destiny: '',
      licensePlate: '',
      dateInitial: '',
      dateFinal: ''
    }
  },
  methods: {
    async handleSaveTrip () {
      try {
        const { origin, destiny, licensePlate, dateInitial, dateFinal } = this
        await addDoc(collection(db, 'trips'), {
          origin,
          destiny,
          licensePlate,
          dateInitial,
          dateFinal
        })
        this.$router.push('/trips')
      } catch (error) {
        console.log('Erro ao atualização:' + error.message)
      }
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    const querySnapshot = await getDocs(collection(db, 'trips'))
    querySnapshot.forEach((doc) => {
      if (doc.id === this.id) {
        this.id = doc.id
        this.origin = doc.data().origin
        this.destiny = doc.data().destiny
        this.licensePlate = doc.data().licensePlate
        this.dateInitial = doc.data().dateInitial
        this.dateFinal = doc.data().dateFinal
      }
    })
  },
  destroyed () {
    this.id = ''
  }
}
</script>

<style lang='scss' scoped>
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
