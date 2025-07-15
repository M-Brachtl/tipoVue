<script setup>
import { ref } from 'vue';

const props = defineProps({
    allData: {
        type: Object,
        required: true
    }
});

// from all the data, we need to make a list of matches
const matches = ref([]);


</script>
¨
<template>
    <div class="matches">
        <h2>Global Matches</h2>
        <ul>
            <li v-for="(matches, userID) in props.allData" :key="userID">
                <h3>{{ userID }}</h3>
                <ul>
                    <li v-for="match in matches" :key="match.match">
                        {{ match.match }} - Result: {{ match.result }} - Guess: {{ match.guess }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>