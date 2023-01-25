<template>
  <div id='trips'>
    <h1 class='title text-center'>Lista de viagens</h1>
    <div class='content'>
      <button class='btn btn-primary' type="button" data-toggle="modal" @click="modalShow = true"
        data-target="#newTrip">
        Nova viagem
      </button>
      <table class='table table-hover'>
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
    <div class="modal fade" id="newTrip" tabindex="-1" role="dialog" aria-labelledby="newTripModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newTripModalLabel">Nova viagem</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action='#' class='row'>
              <div class='form-group mb-2 col-12'>
                <label class="form-label">Origem</label>
                <input required v-model='trip.origin' type='text' class='form-control' />
              </div>
              <div class='form-group mb-2 col-12'>
                <label class="form-label">Destino</label>
                <input required v-model='trip.destiny' type='text' class='form-control' />
              </div>
              <div class='form-group mb-2 col-12'>
                <label class="form-label">Placa</label>
                <input required v-model='trip.licensePlate' type='text' class='form-control' />
              </div>
              <div class='form-group mb-2 col-12'>
                <label class="form-label">Data de saída</label>
                <input v-model='trip.dateInitial' type='text' class='form-control' v-mask="'##/##/####'" />
              </div>
              <div class='form-group mb-2 col-12'>
                <label class="form-label">Data de chegada (opicional)</label>
                <input v-model='trip.dateFinal' type='text' class='form-control' v-mask="'##/##/####'" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="exit" data-dismiss="modal">Cancelar</button>
            <button class='btn btn-primary bottom-0 end-0' @click="handleSaveTrip">
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
      if (this.trip.origin === '' || this.trip.destiny === '' || this.trip.dateInitial === '' || this.trip.licensePlate === '') {
        return false
      } else {
        return true
      }
    }
  },
  async mounted () {
    this.$root.$emit('Spinner::show')
    this.handleGetTrips()
    setTimeout(() => {
      this.$root.$emit('Spinner::hide')
    }, 300)
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
