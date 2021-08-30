<template>
  <div>
    <div class="mt-10">
      <v-card>
        <v-card-title>
          Список
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              :single-select="singleSelect"
              single-line
              hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="dessert"
            :search="search"
            v-model="singleSelect"
        >
          <template v-slot:item.actions="{ item }">
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="payForThis(item)"
                >
                  Открыть профиль
                </v-btn>
              </template>
              <v-card height="300">
                <v-card-title>
                  <span class="text-h5">Профиль пациента</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          md="6"
                      >
                    <h3>Имя: {{payForThis.name}} </h3>
                      </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                        >
                          <h3>Дата рождения: {{payForThis.date}}</h3>
                        </v-col>
                    </v-row>
                    <v-row >
                      <v-col
                          cols="12"
                          sm="6"
                          md="6"
                      >
                        <h3> Доктор: {{item.selectedDoctor.title}}</h3>
                      </v-col>
                      <v-col >
                          <h3>Услуга: {{item.filteredService}}</h3>

                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="closeWindow"
                  >
                    Close
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-card>

      </div>
     </div>
</template>

<script>
import axios from 'axios'
export  default {
  data(){
    return{
      dessert:[],
      dialog:false,
      dialogDelete: false,
      singleSelect:[],
      editedIndex: -1,
      editedIndex1:{
        date:0,
        name:'',
        source:'',
        select:'',
        addedDate: 0,
      },
      defaultItem: {
        date:0,
        name:'',
        source:'',
        select:'',
        addedDate: 0,
      },
      value:'',
      filteredService:'',
      search: '',
      headers: [
        {
          text: 'Имя',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Дата рождения', value: 'date' },
        { text: 'Исходник', value: 'source' },
        { text: 'Состояние', value: 'select' },
         { text: 'Дата добовление', value: 'addedDate' },
        {text: 'Открыть', value: 'actions', sortable: false}
      ],
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.initialize()
  },
  methods:{
    initialize(){
     this.dessert()
    },
    payForThis(item){
      this.editedIndex = this.dessert.indexOf(item)
      this.editedIndex1 = Object.assign({}, item)
      this.dialog = true
    },
    closeWindow(){
      this.dialog = false
      this.$nextTick(() => {
        this.payForThis = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.payForThis = Object.assign({}, item)
      this.dialogDelete = true
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex1 = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
  computed:{
  },

  mounted(){
   axios.get('http://localhost:3000')
       .then(response => (this.dessert = response.data,this.filteredService = this.dessert[0].selectedDoctor.services)).catch((err)=>{
        console.log(err)
})
  //this.filteredService.find((ell)=>ell.value=true)
    console.log(this.filteredService)
  }
}
</script>
