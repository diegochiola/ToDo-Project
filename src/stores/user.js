// /store/user.js
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import router from '@/router'


export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: null
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
          this.user = null;
        }
    },
    async createProfile(profileData) {
      try {
        const { data, error } = await supabase.from('profiles').insert(profileData).single()
        if (error) {
          throw new Error(error.message)
        }
        return data
      } catch (error) {
        throw new Error('Failed to create profile')
      }
    },

    async fetchProfile() {
      try {
        const { data, error } = await supabase.from('profiles').select('*').single()
        if (error) {
          throw new Error(error.message)
        }
        this.profile = data
      } catch (error) {
        throw new Error('Failed to fetch profile')
      }
    },

    async updateProfile(profileData) {
      try {
        const { data, error } = await supabase.from('profiles').update(profileData).single()
        if (error) {
          throw new Error(error.message)
        }
        return data
      } catch (error) {
        throw new Error('Failed to update profile')
      }
    },

    async deleteProfile() {
      try {
        const { error } = await supabase.from('profiles').delete().single()
        if (error) {
          throw new Error(error.message)
        }
      } catch (error) {
        throw new Error('Failed to delete profile')
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
