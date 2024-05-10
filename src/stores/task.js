// /store/task.js

import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import router from '@/router'

//declaramos la store como: "tasks"
export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: null
  }),
  actions: {
    async fetchTasks() {
      //función para traer todas las tareas de la base de datos
      const { data: tasks } = await supabase //se conecta con supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false })
      this.tasks = tasks
    },
  async addTask(user_id, title, status, description) {
    if (title.trim() === '') {
      alert('Please add a valid task title')
      return
    }

    const { error } = await supabase.from('tasks').insert([
      {
        user_id: user_id,
        title: title,
        status: status,
        description: description
      }
    ])

    if (error) {
      console.error('Error adding a task:', error.message)
      alert('An error occurred while adding the task. Please try again later.')
    } else {
      this.fetchTasks()
      router.push('/')
      alert('Task added successfully')
    }
  },
  async deleteTask(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) {
      console.error('Error deleting a task:', error.message)
      alert('An error occurred while deleting the task. Please try again later.')
    } else {
      this.fetchTasks()
      alert('Task deleted successfully')
    }
  },
  async updateTask(id, title, status, description) {
    const { error } = await supabase
      .from('tasks')
      .update({ title: title, status: status, description: description })
      .eq('id', id)
    if (error) {
      console.error('Error updating a task:', error.message)
      alert('An error occurred while updating the task. Please try again later.')
    } else {
      this.fetchTasks()
      alert('Task updated successfully')
    }
  }
}
})