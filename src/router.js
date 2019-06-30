import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import LoginPage from './components/LoginPage.vue'
import LoanHome from './views/LoanHome.vue'
import LoanDetail from './views/LoanDetail.vue'
import RepayIndex from './views/RepayIndex.vue'
import RepayDivide from './views/RepayDivide.vue'
import RepayStd from './views/RepayStd.vue'
import RepayDelay from './views/RepayDelay.vue'
import BankList from './views/BankList.vue'
import BankBind from './views/BankBind.vue'
import ResultSuccess from './views/ResultSuccess.vue'
import ResultDelay from './views/ResultDelay.vue'
import ResultDelay2 from './views/ResultDelay2.vue'
import ResultFail2 from './views/ResultFail2.vue'
import ResultFail from './views/ResultFail.vue'
import ResultWait from './views/ResultWait.vue'
import { getLocal } from './utils/util'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'loginPage',
      component: LoginPage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/loan/home',
      name: 'loanHome',
      component: LoanHome
    },
    {
      path: '/loan/detail',
      name: 'loanDetail',
      component: LoanDetail
    },
    {
      path: '/repay/index',
      name: 'repayIndex',
      component: RepayIndex
    },
    {
      path: '/repay/divide',
      name: 'repayDivide',
      component: RepayDivide
    },
    {
      path: '/repay/std',
      name: 'repayStd',
      component: RepayStd
    },
    {
      path: '/repay/delay',
      name: 'repayDelay',
      component: RepayDelay
    },
    {
      path: '/bank/list',
      name: 'bankList',
      component: BankList
    },
    {
      path: '/bank/bind',
      name: 'bankBind',
      component: BankBind
    },
    {
      path: '/result/success',
      name: 'resultSuccess',
      component: ResultSuccess
    },
    {
      path: '/result/delay2',
      name: 'resultDelay2',
      component: ResultDelay2
    },
    {
      path: '/result/delay',
      name: 'resultDelay',
      component: ResultDelay
    },
    {
      path: '/result/fail',
      name: 'resultFail',
      component: ResultFail
    },
    {
      path: '/result/fail2',
      name: 'resultFail2',
      component: ResultFail2
    },
    {
      path: '/result/wait',
      name: 'resultWait',
      component: ResultWait
    }
  ]
})

//这个是请求页面路由的时候会验证token存不存在，不存在的话会到登录页
router.beforeEach((to, from, next)=>{
  const token = getLocal('token')
  if(token){
    next()
    return
  } else if (to.path !== '/login') {
    next({path: '/login'})
    return
  }
  next()
});

export default router
