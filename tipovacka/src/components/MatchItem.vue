<script setup>
import { watch, ref, toRefs } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  match: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: false,
    default: '-:-'
  },
  guess: {
    type: String,
    required: false,
    default: '-:-'
  }
});

const emit = defineEmits(['update:result', 'update:guess']);

// Lokální kopie props
const localResult = ref(props.result);
const localGuess = ref(props.guess);
const { match } = toRefs(props);

const points = ref(0);
const countPoints = () => {
  if (localResult.value === localGuess.value) {
    points.value = 30;
  } else if ((localResult.value.split(':')[0] > localResult.value.split(":")[1] && localGuess.value.split(':')[0] > localGuess.value.split(":")[1]) || (
    localResult.value.split(':')[0] < localResult.value.split(":")[1] && localGuess.value.split(':')[0] < localGuess.value.split(":")[1]) || (
    localResult.value.split(':')[0] === localResult.value.split(":")[1] && localGuess.value.split(':')[0] === localGuess.value.split(":")[1])
    )
  {
   points.value = 20 - Math.abs(localResult.value.split(':')[0] - localGuess.value.split(':')[0]) - Math.abs(localResult.value.split(':')[1] - localGuess.value.split(':')[1]); 
  }
  else points.value = 0;
};

const updateValue = (field, event) => {
  let value = event.target.innerText.trim();
  // Validate format (e.g., "1:2")
  /*if (!/^\d+:\d+$/.test(value)) {
    value = '-:-';
  }*/
  if (field === 'result') {
    localResult.value = value;
    emit('update:result', value);
  } else if (field === 'guess') {
    localGuess.value = value;
    emit('update:guess', value);
  }
};

// Synchronizujte s props
watch(() => props.result, (newValue) => {
  localResult.value = newValue;
});

watch(() => props.guess, (newValue) => {
  localGuess.value = newValue;
});

watch([localResult, localGuess], countPoints, { immediate: true });

</script>

<template>
  <div>
    <span>{{ match }}</span>
    <span contenteditable="true" @input="updateValue('result', $event)" @blur="updateValue('result', $event)">{{ localResult }}</span>
    <span contenteditable="true" @input="updateValue('guess', $event)" @blur="updateValue('guess', $event)">{{ localGuess }}</span>
    <span>{{ points }}</span>
  </div>
</template>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

</style>
