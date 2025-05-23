<script setup>
import { ref } from 'vue';
import MatchItem from './components/MatchItem.vue';

const totalPoints = ref(0);
const matches = [
  { match: 'Czechia vs Switzerland', result: '2:1', guess: '2:0' },
  { match: 'Germany vs France', result: '1:1', guess: '1:1' },
  { match: 'Italy vs Spain', result: '0:2', guess: '0:3' }
];


const updatePoints = (newPoints, prevPoints) => {
  totalPoints.value += newPoints - prevPoints;
};
</script>

<template>
  <header>Tipovačka</header>
  <main>
    <div id="heading"><span>Zápasy</span><span>Výsledky</span><span>Tipy</span><span>Body: {{ totalPoints }}</span></div>
    <MatchItem v-for="(item, index) in matches" :key="index" :match="item.match" :result="item.result" :guess="item.guess" @points-updated="updatePoints" />
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}
header {
  position: sticky;
  top: 0;
  background-color: black;
  color: white;
  font-size: large;
  padding: 5px 0;
}
main {
  text-align: center;
}
#heading {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
