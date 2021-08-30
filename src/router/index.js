import  Vue from 'vue'
import Router from 'vue-router'
import Reception from "../components/Reception";
import Payment from '../components/Payment'
import Auth from '../components/auth'
import Pay from '../components/pay'
import Doctor from "../components/Doctor";
Vue.use(Router)

const router =new Router ({
    routes:[
        {
         path:'/',
         component:Reception,
         name:'Reception'
        },
        {
            path:'/paymentList',
            component:Payment,
            name:'Payment'
        },
        {
            path:'/payment',
            component:Pay,
            name:'Pay'
        },
        // {
        //     path:'/login',
        //     component:Login,
        //     name:'Login'
        // },
        {
            path:'/auth',
            component:Auth,
            name:'Auth'
        },
        {
            path:'/doctor',
            component:Doctor,
            name:'Doctor'
        },
    ],
    mode:'history'
})
export default  router

// router.beforeEach((to, from, next) => {
//     if (to.name == 'Auth'){
//         {next(); return}
//     }
// })
