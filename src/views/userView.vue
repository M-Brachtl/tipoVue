<script setup>
import { ref } from 'vue';
import MatchItem from '../components/MatchItem.vue';
// from public/matches.json
// import matchesData from './assets/matches.json';

const totalPoints = ref(0);
const props = defineProps({
    allData: {
        type: Object,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    totalPoints: {
        type: Object,
        required: true
    },
    pointsData: {
        type: Array,
        required: true
    }
});
totalPoints.value = props.totalPoints[props.userID] || 0;
const matches = ref(props.allData[props.userID] || [])
// const matches = ref([])
function loadMatches() {
  // Načtení dat z JSON souboru, který vloží uživatel v rámci této funkce

  //požádání uživatele o výběr souboru
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const matchesData = JSON.parse(e.target.result);
          if (Array.isArray(matchesData)) {
            matches.value = []; // Vyprázdníme předchozí zápasy
            totalPoints.value = 0; // Resetujeme body
            for (const item of matchesData) {
              matches.value.push({
                match: item.match,
                result: item.result,
                guess: item.guess || '-:-'
              });
            }
          } else {
            alert('Vložený soubor je poškozený nebo neobsahuje platná data.');
          }
        } catch (error) {
          alert('Vložený soubor je poškozený nebo neobsahuje platná data.');
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
  input.removeEventListener('change', loadMatches);
}

const matchesEl = ref([]); // Reference na všechny MatchItem komponenty

const emits = defineEmits(['updateData']);

function saveMatches() {
  // Nejdříve musíme updatovat výsledky a tipy v matches
  matchesEl.value.forEach((item, index) => {
    matches.value[index].result = item.localResult || '-:-';
    matches.value[index].guess = item.localGuess || '-:-';
  });
  // Aktualizace bodů za jednotlivé zápasy proměnná pointsData
  matchesEl.value.forEach((item, index) => {
    const points = item.points || 0;
    if (props.pointsData[index]) {
      props.pointsData[index].points[props.userID] = points;
    } else {
      props.pointsData.push({
        teams: matches.value[index].match,
        result: matches.value[index].result,
        points: { [props.userID]: points }
      });
    }
  });



  emits('updateData', {
    [props.userID]: matches.value
  }, props.pointsData);
  /*// Uložení dat do JSON souboru
  const data = matches.value.map(item => ({
    match: item.match,
    result: item.result,
    guess: item.guess
  }));
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'matches.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);*/
}

const updatePoints = (newPoints, prevPoints) => {
  totalPoints.value += newPoints - prevPoints;
};
</script>

<template>
  <!-- <header><button @click="loadMatches()">Načíst</button> <span><a href="../">Tipovačka</a></span> <button @click="saveMatches()">Uložit</button></header> -->
  <main>
    <div id="heading"><span>Zápasy</span><span>Výsledky</span><span>Tipy</span><span>Body: {{ totalPoints }}</span></div>
    <MatchItem v-for="(item, index) in matches" :key="index" :match="item.match" :result="item.result" :guess="item.guess" @points-updated="updatePoints" ref="matchesEl" />
  </main>
  <button @click="saveMatches()">Test SaveMatches()</button>
</template>

