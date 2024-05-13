// /store/user.js
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import router from '@/router'


export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    //profile: null
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.getUser() //trae la informacion del usuario
      this.user = user
    },
    async signUp(name, email, password, confirmPassword) {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }
      const { data, error } = await supabase.auth.signUp({
        name: name,
        email: email,
        password: password
      })
      if (error) throw error
      if (data){
        this.user = data
        alert('¡User created successfully!'); //alert
        router.push('/'); //que reddiriga al sign in
      } 
    },
    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (error) throw error
      if (data) this.user = data
      
      router.push('/' )
      //return this.user //devolver usuario
    },
    async logOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.log(error)
        } else {
          console.log('Log Out has been successfully')
          router.push('/auth' )
        }
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage
        }
      ]
    }
  }
})
