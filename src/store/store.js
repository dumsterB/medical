import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        roles:[
            {
               name:'Doctor',
                path:'/',
               password:1
            },
            {
                name:'Director',
                password: 2,
                path:'/payment'
            },
            {
                name:'paymaster',
                password: 3,
                path:'/payment'
            },
        ],
        selectedRole:'Lor',
        doctors: [
            {
                title: 'Lor',
                id:'1',
                open:false,
                name:'Johnson Scottish',
                active:false,
                services:[
                    {
                        value:false,
                        service:'Лечение острых и хронических заболеваний почек и мочевого пузыря (нефритов, пиелонефритов, циститов)'
                    },

                    {
                        value:false,
                        service:'УЗИ мошонки, щитовидной железы, почек и мочевого пузыря'
                    },

                    {
                        value:false,
                        service:'Очистка'
                    }
                ],
                img:'https://www.zdorovie-33.ru/assets/images/vacancies/medsestra.jpg'

            },
            {
                title: 'Laborant',
                id:'2',
                open:false,
                active: false,

                services:[
                    {
                        value:false,
                        service:'Лечение острых и хронических заболеваний почек и мочевого пузыря (нефритов, пиелонефритов, циститов)'
                    },

                    {
                        value:false,
                        service:'УЗИ мошонки, щитовидной железы, почек и мочевого пузыря'
                    },

                    {
                        value:false,
                        service:'Очистка'
                    }
                ],
                name:'Williams Scottish',
                img:'https://ae01.alicdn.com/kf/HTB1CvW4NFXXXXavXpXXq6xXFXXXz/Nurse-Cap-Medical-Hats-Mdical-Caps-Wrinkle-Thicken-Surgical-Caps-Dacron-Doctors-And-Nurses-Adjusted-Hats.jpg'
            },
            {
                title: 'Pediatr',
                id:'3',
                open:false,
                active: false,
                services:[
                    {
                        value:false,
                        service:'Лечение острых и хронических заболеваний почек и мочевого пузыря (нефритов, пиелонефритов, циститов)'
                    },

                    {
                        value:false,
                        service:'УЗИ мошонки, щитовидной железы, почек и мочевого пузыря'
                    },

                    {
                        value:false,
                        service:'Очистка'
                    }
                ],
                name:'Miller Spanish',
                img:'https://www.zdorovie-33.ru/assets/images/vacancies/medsestra.jpg'
            },
            {
                title: 'Pediatr',
                id:'4',
                open:false,
                active: false,
                services:[
                    {
                        value:false,
                        service:'Лечение острых и хронических заболеваний почек и мочевого пузыря (нефритов, пиелонефритов, циститов)'
                    },

                    {
                        value:false,
                        service:'УЗИ мошонки, щитовидной железы, почек и мочевого пузыря'
                    },

                    {
                        value:false,
                        service:'Очистка'
                    }
                ],
                name:'Rodriguez Scottish',
                img:'https://ae01.alicdn.com/kf/HTB1CvW4NFXXXXavXpXXq6xXFXXXz/Nurse-Cap-Medical-Hats-Mdical-Caps-Wrinkle-Thicken-Surgical-Caps-Dacron-Doctors-And-Nurses-Adjusted-Hats.jpg'
            },
        ]
    },
    mutations: {
        // auth(state,payload){
        //
        // }
    },
    actions: {
        ENTER_TO_SYSTEM_BY_ROLE:(contex,payload)=>{
           contex.commit('auth',payload)
}
    },
    getters: {
        doctors(state){
            return state.doctors
        },
        roles(state){
            return state.roles
        },
        selectedRole(state){
            return state.selectedRole
        }
    }
})
export default store