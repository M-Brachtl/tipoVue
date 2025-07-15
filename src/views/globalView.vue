<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    allData: {
        type: Object,
        required: true
    },
    pointsData: {
        type: Array,
        required: true
    }
});
const emit = defineEmits(['userIDEmit']);

function emitIDChange(emittedUserID) {
    // Emit an event to switch user ID
    emit('userIDEmit', emittedUserID);
}

</script>
¨
<template>
    <div class="matches">
        <h2>Global Matches</h2>
        <table>
            <thead>
                <tr>
                    <th>Zápas</th>
                    <th>Výsledek</th>
                    <th v-for="username in Object.keys(allData)"><RouterLink to="/user" @click="emitIDChange(username)">{{ username }}</RouterLink></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(match, index) in pointsData" :key="index">
                    <td>{{ match.teams }}</td>
                    <td>{{ match.result }}</td>
                    <td v-for="userpoints in Object.values(match.points)">
                        {{ userpoints }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.matches {
    padding: 20px;
}
.matches table {
    width: 100%;
    border-collapse: collapse;
}
.matches th, .matches td {
    border: 1px solid #ddd;
    padding: 8px;
}
.matches th {
    background-color: #f2f2f2;
    text-align: left;
}
.matches tr:nth-child(even) {
    background-color: #f9f9f9;
}
.matches tr:hover {
    background-color: #ddd;
}
</style>