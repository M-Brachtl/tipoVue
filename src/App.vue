<script setup>
import { ref, watch } from 'vue';
import { RouterView, RouterLink, useRoute } from 'vue-router'
//import pointsData from './assets/points.json';

const pointsData = ref([]);
// const allData = ref({
//   test1: [
//     { match: 'Czechia vs Switzerland', result: '2:1', guess: '2:0' },
//     { match: 'Germany vs France', result: '1:1', guess: '1:1' },
//     { match: 'Italy vs Spain', result: '0:2', guess: '0:3' }
//   ],
//   test2: [
//     { match: 'Czechia vs Switzerland', result: '2:1', guess: '1:0' },
//     { match: 'Germany vs France', result: '1:1', guess: '2:2' },
//     { match: 'Italy vs Spain', result: '0:2', guess: '0:2' }
//   ]
// });
const allData = ref({});
fetch('http://localhost:5000/tipovacka/get_points')
  .then(response => response.json())
  .then(data => {
    // console.log("Fetched points data:", data);
    pointsData.value = data;
  })
  .catch(error => {
    console.error('Error fetching points data:', error);
  });

fetch('http://localhost:5000/tipovacka/get_users')
  .then(response => response.json())
  .then(data => {
    // console.log("Fetched allData:", data);
    allData.value = data;
  })
  .catch(error => {
    console.error('Error fetching allData:', error);
  });


const totalPoints = ref({
  test1: 0,
  test2: 0
});

const matchPoints = ref([])
matchPoints.value = pointsData;

const TOKEN = '5be75b7c6d652dd5e38d3034e9cd6fb9abf5df80d0687771391d5d1ba611a158';

function updateData(newData, newPoints) {
  allData.value = { ...allData.value, ...newData };
  // console.log("Updated allData:", allData.value);

  // send POST request to save data
  fetch('http://localhost:5000/tipovacka/post_users/' + TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(allData.value)
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).then(() => {
    updatePoints(newPoints);
  }).catch(error => {
    console.error('Error saving data:', error);
  });
}

function updatePoints(newPoints) {
  matchPoints.value = newPoints;
  // console.log("Updated totalPoints:", totalPoints.value);

  // send POST request to save points
  fetch('http://localhost:5000/tipovacka/post_points/' + TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(matchPoints.value)
  })
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