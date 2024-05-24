// /store/task.js

import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import { useUserStore } from "../stores/user.js";

//declaramos la store como: "tasks"
export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks:[],
  }),
  actions: {
    async fetchTasks() {
      try {
        const { data: tasks } = await supabase
          .from('tasks')
          .select('*')
          .eq('user_id', useUserStore().user.id)
          .order('id', { ascending: false })
          this.tasks = tasks;
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    },
  async addTask( title, status, description) {
    if (title.trim() === '') {
      alert('Please add a valid task title')
      return
    }
    const { error } = await supabase.from('tasks').insert([
      {
        user_id: useUserStore().user.id,
        title: title,
        status: status,
        description: description,
        created_at: new Date()
      }
    ])
    if (error) {
      console.error('Error adding a task:', error.message)
      alert('An error occurred while adding the task. Please try again later.')
    }
  },
  async deleteTask(taskId) {
    const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)
    if (error) {
      console.error('Error deleting a task:', error.message)
      alert('An error occurred while deleting the task. Please try again later.')
    }
    //this.tasks = this.tasks.filter((task) => task.id !== taskId);
  },
  async updateTask( id, updatedTitle, updatedStatus, updatedDescription) {
    const { error } = await supabase
      .from('tasks')
      .update({ title: updatedTitle, 
        status: updatedStatus, 
        description: updatedDescription })
      .eq('id', id)
    if (error) {
      console.error('Error updating a task:', error.message)
      alert('An error occurred while updating the task. Please try again later.')
    }
  },
  async updateTaskStatus(taskId, newStatus) {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId);

      if (error) {
        throw error;
      }
      return true; 
    } catch (error) {
      console.error('Error updating task status:', error.message);
      return false;
    }
  }
}
})