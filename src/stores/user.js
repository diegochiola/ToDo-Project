import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import router from '@/router'
import defaultAvatar from '@/assets/defaultAvatar.png'
import { useTaskStore } from "../stores/task.js";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: null
  }),

  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      this.user = data.user;
    },

    async signUp(username, email, password, confirmPassword) {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        })
        if (error) throw error
        if (data) {
          alert('User created successfully! Please check your email for verification')
          const profileData = {
            user_id: data.user.id,
            name: null,
            username: username,
            website: null,
            email: email,
            avatar_url: defaultAvatar
          }
          console.log('Default Avatar URL:', defaultAvatar)
          await this.createProfile(profileData)
          this.profile = profileData
          this.user = data.user
          console.log('User and profile created successfully!')
          router.push('/')
        }
      } catch (error) {
        console.error('Error creating user:', error.message)
        throw new Error('Error creating user: ' + error.message)
      }
    },

    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (error) throw error
      if (data) {
        this.user = data.user
        router.push('/')
        const taskStore = useTaskStore();
        await taskStore.fetchTasks();
        console.log('User:', this.user)
      }
     
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
        console.error('Logging out error:', error)
      }
    },
    async createProfile(profileData) {
      try {
        console.log(profileData)
        const { error } = await supabase.from('profiles').insert(profileData).single()
        if (error) {
          throw new Error(error.message)
        }
      } catch (error) {
        throw new Error('Failed to create profile')
      }
    },

    async fetchProfile() {
      if (!this.user) return; 
      console.log('Fetching profile...')
      console.log(this.user.id)
      try {
        const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .match({user_id: this.user.id})
        .single()

        if (error) {
          throw new Error(error.message)
        }
        this.profile = data;
        console.log('The profile is: ' + data)
      } catch (error) {
        throw new Error('Failed to fetch profile or not profile created yet')
      }
    },

    async updateProfile(profileData) {
      console.log(profileData)

        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .match({user_id: this.user.id})
        if (error) {
          throw new Error(error.message)
        }
        this.profile = profileData
      
    },

    async deleteProfile() {
      try {
        const { error } = await supabase
        .from('profiles')
        .delete()
        .match({user_id: this.user.id})
        .single()
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
