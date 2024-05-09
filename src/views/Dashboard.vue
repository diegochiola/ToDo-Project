<script setup>
import NavBarComponent from '../components/NavBarComponent.vue'
import { ref, onMounted, computed } from 'vue'

const toDos = ref([])
const title = ref('')
const description = ref('')
const status = ref(null)

const addToDo = () => {
  if (title.value === '' || description.value === '' || status.value === null) {
    return
  }
  toDos.value.push({
    title: title.value,
    description: description.value,
    status: status.value,
    createdAt: new Date().getTime()
  })
}

onMounted(() => {
  toDos.value = []
})

//sort toDos ascending
const ToDosAsc = ref(() =>
  toDos.value.sort((a, b) => {
    return b.createdAt - a.createdAt
  })
)

/*
//show user details on dashboard
async function getSession() {
  account.value = await supabase.auth.getSession();
  console.log(account.value);  
}
const account = ref({})
getSession();
*/
</script>

<template>
  <NavBarComponent />

  <div class="dashboard">
    <h1>Create a new To Do</h1>
    <br />
    <!-- <h3 id="account"> Welcome {{ account.data.session.user.user_metadata.first_name }}!</h3> -->

    <p>Nice to have you here again.</p>
  </div>

  <section class="to-dos">
    <form @submit.prevent="addToDo">
      <div class="form-elements">
        <label>What's on your ToDo list?</label>
        <input type="text" placeholder="e.g Grocery Shopping" id="title" v-model="title" />
      </div>
      <div class="form-elements">
        <label>Description </label>
        <input
          type="text"
          placeholder="e.g. Buy milk, eggs, bread, and vegetables "
          id="description"
          v-model="description"
        />
      </div>

      <div class="form-elements status">
        <label>Select a status</label>
        <select placeholder="Select a status" id="status" class="selector">
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div class="form-elements">
        <button type="submit" value="Add To Do">Add To Do</button>
        </div>
      
    </form>
  </section>
  <br />
  <section class="todo-list">
    <h3>Your ToDos</h3>
    <div>
      <div v-for="toDo in ToDos" :key="toDo"></div>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.to-dos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  width: 600px;
  height: 350px;
  border-radius: 45px;
  box-shadow: var(--shadow);
  color: var(--gray);
}
.form-elements {
  display: flex;
  flex-direction: column;
  gap:10px
 
  
}
label{
  margin-top: 20px;
}
input {
  width: 300px;
  height: 30px;
  border-radius: 30px;
  border: 2px solid var(--purple);
  text-indent: 10px;
}
.selector {
  width: 300px;
  height: 30px;
  border-radius: 30px;
  border: 2px solid var(--purple);
  text-indent: 10px;
  color: var(--gray);
}
button {
  width: 300px;
  height: 30px;
  border-radius: 30px;
  border: none;
  background-color: var(--purple);
  color: var(--white);
  margin-top: 20px;
}
button:hover {
  cursor: pointer;
  color: var(--yellow);
}
.todo-list {
  display: flex;
	align-items: center;
	background-color: var(--white);
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1rem;
}
</style>
