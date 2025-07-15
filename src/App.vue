<script setup>
import { ref, watch } from 'vue';
import { RouterView, RouterLink, useRoute } from 'vue-router'
import pointsData from './assets/points.json';

const allData = ref({
  test1: [
    { match: 'Czechia vs Switzerland', result: '2:1', guess: '2:0' },
    { match: 'Germany vs France', result: '1:1', guess: '1:1' },
    { match: 'Italy vs Spain', result: '0:2', guess: '0:3' }
  ],
  test2: [
    { match: 'Czechia vs Switzerland', result: '2:1', guess: '1:0' },
    { match: 'Germany vs France', result: '1:1', guess: '2:2' },
    { match: 'Italy vs Spain', result: '0:2', guess: '0:2' }
  ]
});
const totalPoints = ref({
  test1: 68,
  test2: 66
});
const matchPoints = ref([])
matchPoints.value = pointsData;

function updateData(newData) {
  allData.value = { ...allData.value, ...newData };
  // console.log("Updated allData:", allData.value);

  // send POST request to save data
}

const userID = ref('test1'); // Předpokládáme, že uživatel je 'test1'

const route = useRoute();
const currentLocation = ref(route.path);
watch(() => route.path, (newPath) => {
  currentLocation.value = newPath;
});

function userIDSwitch(newUserID) {
  userID.value = newUserID;
  // console.log("Switched userID to:", userID.value);
}

</script>

<template>
  <header><button @click="loadMatches()">Načíst</button> <span>{{ "Tipovačka" }}</span> <button @click="saveMatches()">Uložit</button></header>

  <RouterView v-slot="{ Component }">
    <Component :is="Component" :allData="allData" :userID="userID" :totalPoints="totalPoints" :pointsData="pointsData" @updateData="updateData" @userIDEmit="userIDSwitch" />
  </RouterView>
  <div class="navigation">
    <!-- <input type="text" v-model="userID" placeholder="Enter User ID" v-if="currentLocation !== '/user'" /> -->
    <select v-model="userID" v-if="currentLocation !== '/user'">
      <option v-for="userKey in Object.keys(allData)">{{ userKey }}</option>
    </select>


    <RouterLink to="/" v-if="currentLocation !== '/'">Global View</RouterLink>
    <RouterLink to="/user" v-if="currentLocation !== '/user'">User View</RouterLink>
  </div>
</template>