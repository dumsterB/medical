<template>
  <div>
    <v-container fluid>
      <v-row class=" rowForm">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="form"

        >
          <v-text-field
              v-model="role"
              label="Name"
              required
          ></v-text-field>

          <v-text-field
              v-model="password"
              label="Password"
              class=""
              required
          ></v-text-field>

          <v-btn
              color="primary"
              :disabled="!valid"
              class="mr-4"
              @click="enter"
              large
          >
            Зайти
          </v-btn>

        </v-form>
        {{ roles }}
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    password: '',
    role: '',
  }),
  computed: {
    ...mapGetters(['roles'])
  },
  methods: {

    enter() {
      if (this.roles[0].name == this.name && this.roles[0].password == this.password) {
       return  this.$router.push({path:'/payment'})
      } else if (this.roles[1].name == this.name && this.roles[1].password == this.password) {
      return   this.$router.push(this.roles[1].path)
      } else if (this.roles[2].name == this.name && this.roles[2].password == this.password) {
     return    this.$router.push(this.roles[2].path)
      }

      const role={
            password:this.password,
            role:this.role
          }
  axios.post('http://localhost:3000/auth',role)
    .then((res)=>{
      console.log(res)
    }).catch((err)=>{
  console.log(err)
})
      console.log(role)
    }
  },
}
</script>

<style scoped>
.rowForm {
  justify-content: center;
  align-items: center;
  align-content: center;
}

.form {
  width: 800px;
  margin-top: 50px;

}
</style>