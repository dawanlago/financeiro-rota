<template>
  <div>
    <div class="header-trip-finance">
      <div class="header-trip-finance-data">
        <!-- <div> -->
        <p class="title-trip-finance">{{ origin }} x {{ destiny }}</p>
        <p class="title-trip-finance">Saída: {{ dateInitial }} </p>
        <p class="title-trip-finance">Placa: {{ licensePlate }} </p>
        <!-- </div> -->
        <!-- <button class="btn btn-primary btn-new-trip">Adicionar viagem</button> -->
      </div>
      <button class="btn btn-primary" data-toggle="modal" @click="modalShow = true" data-target="#newTripFinance">Novo
        lançamento</button>
    </div>

    <h3 class="text-center">Lançamentos</h3>
    <div class="row mw-100 container-trip-finance">
      <div class="card col-8">
        <div class="card-body">
          <h5 class="card-title"><span class="material-icons receipt">
              attach_money
            </span> Receitas</h5>

          <table class='table table-hover'>
            <thead>
              <tr>
                <th width="30%" scope='col'>Data do movimento</th>
                <th width="50%" scope='col'>Descrição</th>
                <th width="10%" scope='col'>Valor</th>
                <th width="10%" scope='col'>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='moviment in receiptMoviments' :key='moviment.id'>
                <th width="30%" scope='row'>{{ moviment.data().dateMoviment }}</th>
                <td width="50%">{{ moviment.data().description }}</td>
                <td width="10%">{{
                  moviment.data().price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                }}</td>
                <td width="10%">
                  <i class='fa-solid fa-ban'></i>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
      <div class="card col-8 container-expense">
        <div class="card-body">
          <h5 class="card-title">
            <span class="material-icons expense">
              money_off_csred
            </span> Despesas
          </h5>
          <table class='table table-hover'>
            <thead>
              <tr>
                <th scope='col' width="30%">Data do movimento</th>
                <th scope='col' width="50%">Descrição</th>
                <th scope='col' width="10%">Valor</th>
                <th scope='col' width="10%">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='moviment in expenseMoviments' :key='moviment.id'>
                <th width="30%" scope='row'>{{ moviment.data().dateMoviment }}</th>
                <td width="50%">{{ moviment.data().description }}</td>
                <td width="10%">{{
                  moviment.data().price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                }}</td>
                <td width="10%">
                  <i class='fa-solid fa-ban'></i>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
    <div class="col-12 container-result">
      <div class="card-body">
        <h5 class="card-title"><span class="material-icons result">
            account_balance_wallet
          </span> Resultado</h5>
        <h5>{{ result.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}</h5>
      </div>
    </div>
    <div class="modal fade" id="newTripFinance" tabindex="-1" role="dialog" aria-labelledby="newTripFinanceModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newTripFinanceModalLabel">Novo lançamento</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form action='#' class='row'>
              <div class='form-group mb-2 col-12'>
                <label class="form-label">Tipo</label>
                <select class="form-select col-12"
                  v-model="newFinance.type">
                  <option value="1">Receita</option>
                  <option value="2">Despesa</option>
                  <option value="3">Adiantamento</option>
                </select>
              </div>
              <div class='form-group mb-2 col-12'>
                <label class="form-label">Valor</label>
                <input required v-model='newFinance.price' type='text' class='form-control' />
              </div>
              <div class='form-group mb-2 col-12'>
                <label class="form-label">Descrição</label>
                <input required v-model='newFinance.description' type='text' class='form-control' />
              </div>
              <div class='form-group mb-2 col-12'>
                <label class="form-label">Data do movimento</label>
                <input v-model='newFinance.dateMoviment' type='text' class='form-control' />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="exit" data-dismiss="modal">Cancelar</button>
            <button @click='handleSaveTripFinance()' class='btn btn-primary bottom-0 end-0'>
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
import { collection, addDoc, getDocs, query, where } from '@firebase/firestore'

export default {
  name: 'TripFinance',
  data: () => {
    return {
      idTrip: '',
      origin: '',
      destiny: '',
      licensePlate: '',
      dateInitial: '',
      dateFinal: '',
      newFinance: {
        idTrip: '',
        type: '',
        price: '',
        description: '',
        dateMoviment: ''
      },
      receiptMoviments: [],
      expenseMoviments: [],
      result: 0
    }
  },
  methods: {
    async handleSaveTripFinance () {
      if (this.verifyFields()) {
        try {
          const { idTrip, type, price, description, dateMoviment } = this.newFinance
          await addDoc(collection(db, 'financial'), {
            idTrip,
            type,
            price,
            description,
            dateMoviment
          })
          this.getMoviments()
          document.getElementById('exit').click()
        } catch (error) {
          console.log('Erro ao atualização:' + error.message)
        }
      }
    },
    verifyFields () {
      const { idTrip, type, price, description, dateMoviment } = this.newFinance
      if (idTrip === '' || type === '' || price === '' || description === '' || dateMoviment === '') {
        return false
      } else {
        return true
      }
    },
    async getTrip () {
      this.idTrip = this.$route.params.id
      const querySnapshot = await getDocs(collection(db, 'trips'))
      querySnapshot.forEach((doc) => {
        if (doc.id === this.idTrip) {
          this.newFinance.idTrip = this.idTrip
          this.origin = doc.data().origin
          this.destiny = doc.data().destiny
          this.licensePlate = doc.data().licensePlate
          this.dateInitial = doc.data().dateInitial
          this.dateFinal = doc.data().dateFinal
        }
      })
    },
    async getMoviments () {
      this.expenseMoviments = []
      this.receiptMoviments = []
      const q = query(collection(db, 'financial'), where('idTrip', '==', this.idTrip))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc => {
        if (doc.data().type === '1' || doc.data().type === '3') {
          this.receiptMoviments.push(doc)
          const price = parseFloat(doc.data().price)
          this.result += price
        } else {
          this.expenseMoviments.push(doc)
          const price = parseFloat(doc.data().price)
          this.result -= price
        }
      })
    }
  },
  async mounted () {
    this.$root.$emit('Spinner::show')
    this.getTrip()
    this.getMoviments()
    setTimeout(() => {
      this.$root.$emit('Spinner::hide')
    }, 300)
  },
  destroyed () {
    this.newFinance.idTrip = ''
  }
}
</script>

<style lang='scss' scoped>
.btn,
.form-control {
  height: 50px;
}

.header-trip-finance {
  display: flex;
  margin-left: 15px;
  margin-right: 30px;
  justify-content: space-between;
  align-items: baseline;
}

.header-trip-finance-data {
  display: flex;
  align-items: baseline;
}

.title-trip-finance {
  margin: 0px 15px;
  font-weight: bold;
}

.btn-new-trip {
  background-color: #0D6EFD !important;
  height: 30px;
  font-size: 14px !important;
  display: flex;
  align-items: center;
  border-color: #0D6EFD !important;
}

.container-trip-finance {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 100px;
}

.card {
  background-color: var(--lighter-10);
  margin-bottom: 10px;
}

.card-title {
  display: flex;
  justify-content: baseline;
}

.receipt,
.result {
  color: var(--green)
}

.expense {
  color: var(--red);
}

.container-result {
  max-height: 150px !important;
  background-color: var(--lighter-10);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
