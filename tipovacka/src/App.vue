<script setup>
//import { ref } from 'vue';
import MatchItem from './components/MatchItem.vue';

</script>

<template>
  <header>Tipovačka</header>
  <main>
    <div id="heading"><span>Zápasy</span><span>Výsledky</span><span>Tipy</span><span>Body</span></div>
    <MatchItem match="Czechia vs Switzerland" result="2:1" guess="2:0"/>
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
