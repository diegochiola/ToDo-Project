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
      const user = await supabase.auth.getUser()
      this.user = user
      console.log(this.user)
    },
    async signUp(username, email, password, confirmPassword) {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password
        })
        if (error) throw error
        if (data) {
          alert('User created successfully! Check your email for verification')
          console.log(data.user.id)
          await this.createProfile({
            user_id: data.user.id,
            name: null,
            username: username,
            website: null,
            email: email,
            avatar_url: null
          })
          
          this.user = data.user
          console.log(this.user)
          router.push('/')
          console.log(this.profile)
          alert('User and profile created successfully!')
        }
      } catch (error) {
        throw new Error('Error creating user:', error.message)
      }
    },
    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (error) throw error
      if (data) {

        this.user = data
        console.log('User:', this.user)
      }
      router.push('/')
    },
    async logOut() {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.log(error)
        } else {
          console.log('Log Out has been successfully')
          router.push('/auth')
          this.user = null
          this.profile = null
        }
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
      }
    },
    async createProfile(profileData) {
      try {
        console.log(profileData)
        const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .single()
        if (error) {
          throw new Error(error.message)
        }
      } catch (error) {
        throw new Error('Failed to create profile')
      }
    },

    async fetchProfile(user_id) {
      console.log(user_id)
      try {
        const { data, error } = await supabase.from('profiles')
        .select('*')
        .eq('user_id', user_id)
        if (error) {
          throw new Error(error.message)
        }
        this.profile = data[0]
        console.log('The profile is: ' + this.profile)
      } catch (error) {
        throw new Error('Failed to fetch profile or not profile created yet')
      }
    },

    async updateProfile(profileData) {
      console.log(profileData)
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('user_id', profileData.user_id)
        if (error) {
          throw new Error(error.message)
        }
        this.profile = data
      } catch (error) {
        throw new Error('Failed to update profile')
      }
    },

    async deleteProfile(user_id) {
      try {
        const { error } = await supabase.from('profiles').delete().eq('user_id', user_id).single()
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
