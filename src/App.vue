<script setup>
import { ref } from 'vue';
import MatchItem from './components/MatchItem.vue';
// from public/matches.json
// import matchesData from './assets/matches.json';

const totalPoints = ref(0);
const matches = ref([
  { match: 'Czechia vs Switzerland', result: '2:1', guess: '2:0' },
  { match: 'Germany vs France', result: '1:1', guess: '1:1' },
  { match: 'Italy vs Spain', result: '0:2', guess: '0:3' }
]);
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


function saveMatches() {
  // Nejdříve musíme updatovat výsledky a tipy v matches
  document.querySelectorAll('.match-item').forEach((item, index) => {
    const inputs = item.querySelectorAll('input');
    if (inputs.length >= 2) {
      matches.value[index].result = inputs[0].value;
      matches.value[index].guess = inputs[1].value;
    }
  });

  // Uložení dat do JSON souboru
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
  URL.revokeObjectURL(url);
}

const updatePoints = (newPoints, prevPoints) => {
  totalPoints.value += newPoints - prevPoints;
};
</script>

<template>
  <header><button @click="loadMatches()">Načíst</button> <span>Tipovačka</span> <button @click="saveMatches()">Uložit</button></header>
  <main>
    <div id="heading"><span>Zápasy</span><span>Výsledky</span><span>Tipy</span><span>Body: {{ totalPoints }}</span></div>
    <MatchItem v-for="(item, index) in matches" :key="index" :match="item.match" :result="item.result" :guess="item.guess" @points-updated="updatePoints" />
  </main>
</template>

