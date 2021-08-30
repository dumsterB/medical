<template>
  <div class="reception">
    <h1 class="text-center">Новая Запись!</h1>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Полное Имя"
          required
      ></v-text-field>
      <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs"
                  v-on="on">mdi-calendar
          </v-icon>
          <v-text-field
              v-model="date"
              label="Год рождения"
          ></v-text-field>
        </template>

        <v-date-picker
            v-model="date"
            no-title
            scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>

      </v-menu>
      <v-text-field
          v-model="source"
          label="Исходник"
          required
      ></v-text-field>

      <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Выбрать состояние"
          required
      ></v-select>
  <v-row>
<v-col v-for="doctor of doctors" cols="3" :key="doctor.id">
  <v-card
      class="mx-auto"
      max-width="344"
      outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{doctor.title}}
        </div>
        <v-list-item-title class="text-h5 mb-1">
        {{doctor.name}}
        </v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
          tile
          size="80"
          color="grey"
      ><img :src="doctor.img" alt=""></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
          outlined
          rounded
          text
          dark
          id="btn"
          :class="[doctor.active ? 'red':'primary']"
          @click="chooseDoctor(doctor)"
      >
        Выбрать
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn
          icon
          @click="doctor.open = !doctor.open"
      >
        <v-icon>{{ doctor.open ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="doctor.open" >
        <v-divider></v-divider>
        <v-checkbox
            v-model="service.value"
            :label="service.service"
            v-for="service of doctor.services" :key="service.service"
        ></v-checkbox>
      </div>
    </v-expand-transition>
  </v-card>
</v-col>
  </v-row>
      <br><br>
      <v-btn
          :disabled="!valid"
          color="primary"
          class="mr-4"
          large
          @click="sendNewUser"
      >
        Отправить
      </v-btn>
    </v-form>

  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import axios from  'axios'
export default {
  data() {
    return {
      valid: true,
      isActive : false,
      show: false,
      addedDate:this.currentDate(),
      name: '',
      selectedDoctor:'',
      ell:'',
      border1:'',
      border:'',
      selectedDoctors:[],
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 40) || 'Name must be less than 10 characters',
      ],
      source:'',
      menu:'',
      date:'',
      select: null,
      items: [
        'Запись на прием',
        'Вопросы по цене',
        'Иностранные пациенты',
        'Другое',
      ],
    }
  },
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()} - ${current.getHours()}:${current.getMinutes()}`;
      return date;
    },
    send() {
      this.$refs.form.validate()
    },
    sendNewUser(){
      const newUser={
        name:this.name,
        date:this.date,
        source:this.source,
        select:this.select,
        selectedDoctor:this.selectedDoctor,
        addedDate:this.addedDate,

      }
      axios.post('http://localhost:3000',newUser)
      .then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
      console.log(newUser)

    },
    chooseDoctor(doctor){
      this.selectedDoctor=doctor
      doctor.active=!doctor.active
    },
  },
  computed:{
    ...mapGetters(['doctors']),
  },
  mounted() {
  }
}

</script>

<style scoped>
.reception {
  justify-content: center;
  justify-items: center;
  padding: 50px;
}

</style>