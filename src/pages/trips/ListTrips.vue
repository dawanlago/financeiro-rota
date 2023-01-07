<template>
  <div id='trips'>
    <h1 class='title text-center'>Lista de viagens</h1>
    <div class='content'>
      <button class='btn btn-primary' type="button" data-toggle="modal" @click="modalShow = true"
        data-target="#exampleModal">
        Nova viagem
      </button>
      <table class='table'>
        <thead>
          <tr>
            <th scope='col'>Placa</th>
            <th scope='col'>Origem</th>
            <th scope='col'>Destino</th>
            <th scope='col'>Data de Saída</th>
            <th scope='col'>Data de Chegada</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='trip in trips' :key='trip.id'>
            <th scope='row'>{{ trip.data().licensePlate }}</th>
            <td>{{ trip.data().origin }}</td>
            <td>{{ trip.data().destiny }}</td>
            <td>{{ trip.data().dateInitial }}</td>
            <td>{{ trip.data().dateFinal }}</td>
            <td>
              <i @click='handleEdit(trip.id)' class='fa-regular fa-pen-to-square'></i>

              <i class='fa-solid fa-ban'></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action='#' class='row'>
              <div class='form-group mb-2 col-12'>
                <input required v-model='trip.origin' type='text' class='form-control' placeholder='Origem' />
              </div>
              <div class='form-group mb-2 col-12'>
                <input required v-model='trip.destiny' type='text' class='form-control' placeholder='Destino' />
              </div>
              <div class='form-group mb-2 col-12'>
                <input required v-model='trip.licensePlate' type='text' class='form-control' placeholder='Placa' />
              </div>
              <div class='form-group mb-2 col-12'>
                <input v-model='trip.dateInitial' type='text' class='form-control' placeholder='Data de saída' />
              </div>
              <div class='form-group mb-2 col-12'>
                <input v-model='trip.dateFinal' type='text' class='form-control'
                  placeholder='Data de chegada (Opcional)' />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="exit" data-dismiss="modal">Cancelar</button>
            <button @click='handleSaveTrip()' class='btn btn-primary bottom-0 end-0'>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { collection, getDocs, addDoc } from '@firebase/firestore'

export default {
  name: 'Trips',
  data () {
    return {
      trips: [],
      trip: {
        origin: '',
        destiny: '',
        licensePlate: '',
        dateInitial: '',
        dateFinal: ''
      }
    }
  },
  methods: {
    handleTripFinance () {
      this.$router.push('/trip-finance')
    },
    async handleSaveTrip () {
      if (this.verifyFields()) {
        try {
          const { origin, destiny, licensePlate, dateInitial, dateFinal } = this.trip
          await addDoc(collection(db, 'trips'), {
            origin,
            destiny,
            licensePlate,
            dateInitial,
            dateFinal
          })
          this.handleGetTrips()
          document.getElementById('exit').click()
        } catch (error) {
          console.log('Erro ao atualização:' + error.message)
        }
      }
    },
    handleEdit (id) {
      this.$router.push('/trip-finance/' + id)
    },
    async handleGetTrips () {
      this.trips = []
      const querySnapshot = await getDocs(collection(db, 'trips'))
      querySnapshot.forEach((doc) => {
        this.trips.push(doc)
      })
    },
    verifyFields () {
      console.log(this.trip)
      if (this.trip.origin === '' || this.trip.destiny === '' || this.trip.dateInitial === '' || this.trip.licensePlate === '') {
        return false
      } else {
        return true
      }
    }
  },
  async mounted () {
    this.handleGetTrips()
  }
}
</script>

<style lang='scss' scoped>
#trips {
  justify-content: center;
  align-items: center;
}

.content {
  margin: 0 30px;
}

.title {
  font-size: 30px;
  display: block;
}

.fa-regular,
.fa-solid {
  margin: 0 10px;
  text-align: center;
}

.fa-pen-to-square {
  color: var(--edit-pentil);
}

.fa-ban {
  color: var(--red);
}

.fa-circle-check {
  color: var(--green);
}

button {
  margin-bottom: 30px;
}

.btn,
.form-control {
  height: 50px;
}
</style>
