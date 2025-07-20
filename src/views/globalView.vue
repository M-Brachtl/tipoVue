<script setup>
import { onMounted } from 'vue';
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

const generateTempUsers = (n) => {
    // Generate temporary user data for testing in allData
    const tempUsers = {};
    for (let i = 1; i <= n; i++) {
        tempUsers[`temp${i}`] = {};
    }
    Object.assign(props.allData, tempUsers);

};
onMounted(() => {
    // Initialize with some temporary users for testing
    //generateTempUsers(14);
});
</script>
¨
<template>
    <div class="matches">
        <h2>Global Matches</h2>
        <table>
            <thead>
                <tr>
                    <th id="match">Zápas</th>
                    <th id="result">Výsledek</th>
                    <th v-for="username in Object.keys(allData)" class="username"><RouterLink class="user-link" to="/user" @click="emitIDChange(username)">{{ username }}</RouterLink></th>
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.matches table {
    border-collapse: collapse;
    overflow-x: auto;
    display: block;
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
.user-link {
    color: #000000;
    text-decoration: none;
    width: -webkit-fill-available;
    display: inline-block;
}
#result {
    width: 0; /* as small as possible */
}
#match {
    width: 170px;
}
.username {
    width: 100px;
}
.matches h2 {
    text-align: center;
}
</style>