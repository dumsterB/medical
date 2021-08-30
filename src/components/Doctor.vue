<template>
  <div>
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
          sort-by="calories"
          class="elevation-1"
      >
        <template v-slot:top>
          <v-dialog
              v-model="dialog"
              max-width="1000px"
          >
            <v-card height="400" width="1000">
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

                      <h2>Имя: <span class="valueOfDessert" v-if="editedItem.name">{{ editedItem.name }} </span> <span class="valueOfDessert" v-else><v-icon>mdi-autorenew</v-icon></span></h2>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >

                      <h2>Дата рождения: <span class="valueOfDessert">{{ editedItem.date }}</span></h2>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >

                      <h2>Откуда узнали о нас: <span class="valueOfDessert">{{ editedItem.source }}</span></h2>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                    >

                      <h2>Состояние: <span class="valueOfDessert">{{ editedItem.select }}</span></h2>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="6"
                    >
                      <h2  >Выбраный доктор:
                        <span class="valueOfDessert" v-if="editedItem.selectedDoctor.title">{{editedItem.selectedDoctor.title}} </span> <span class="valueOfDessert" v-else><v-icon>mdi-autorenew</v-icon></span>
                      </h2>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="6"
                    >
                      <h2  >Общая цена сервиса:
                        <span  class="valueOfDessert" >100.000 минг</span>
                      </h2>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="12"
                    >
                      <h2  >Выбраный доктор:
                        <span class="valueOfDessert"  v-for="{ service } in services" :key="service">{{service}} </span>
                      </h2>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1 "
                    dark
                    @click="close"
                >
                  Платить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
              class=" primary"
              @click="editItem(item)">
            Открыть
          </v-btn>

        </template>
        <template v-slot:no-data>
          <v-btn
              color="primary"
              @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    singleSelect: [],
    headers: [
      {
        text: 'Имя',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {text: 'Дата рождения', value: 'date'},
      {text: 'Исходник', value: 'source'},
      {text: 'Состояние', value: 'select'},
      {text: 'Дата добовление', value: 'addedDate'},
      {text: 'Открыть', value: 'actions', sortable: false}
    ],
    desserts: [],
    dessert: [],
    editedIndex: -1,
    editedItem: {
      date: 0,
      name: '',
      source: '',
      select: '',
      addedDate: 0,
      selectedDoctor: {
      },
    },
    defaultItem: {
      date: 0,
      name: '',
      source: '',
      select: '',
      addedDate: 0,
    },
  }),
  computed:{
    services(){
      return  this.editedItem.selectedDoctor.services?.filter(({ value }) => !!value) || []
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.dessert = this.desserts
    },

    editItem(item) {
      this.editedIndex = this.dessert.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.dessert.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.dessert.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },


  },
  mounted() {
    axios.get('http://localhost:3000')
        .then(response => (this.dessert = response.data.selectedDoctor?.title.filter(({title})=>title==='Lor'))).catch((err) => {
      console.log(err,this.dessert)
    })
  }
}
</script>

<style scoped>
.valueOfDessert {
  color: grey;
  font-weight: 800;
}
</style>