import { createRouter, createWebHistory } from 'vue-router'
import CustomerView from '@/views/CustomerView.vue'
import QuestionManagementView from '@/views/QuestionManagementView.vue'
import CreateEditQuestionView from '@/views/CreateEditQuestionView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: CustomerView
  },
  {
    path: '/management',
    name: 'management',
    component: QuestionManagementView
  },
  {
    path: '/management/:id',
    name: 'questionEdit',
    component: CreateEditQuestionView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
