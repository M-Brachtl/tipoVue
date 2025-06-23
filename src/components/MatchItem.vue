<script setup>
import { watch, ref, toRefs, onMounted } from 'vue';
//import { defineProps, defineEmits, defineExpose } from 'vue';

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

const emit = defineEmits(['points-updated']);

// Lokální kopie props
const localResult = ref(props.result);
const localGuess = ref(props.guess);
const { match } = toRefs(props);

const points = ref(0);
const countPoints = () => {
  const prevValue = points.value;
  if (localResult.value === localGuess.value) {
    points.value = 30;
  } else if (((localResult.value.split(':')[0] > localResult.value.split(":")[1] && localGuess.value.split(':')[0] > localGuess.value.split(":")[1]) || (
    localResult.value.split(':')[0] < localResult.value.split(":")[1] && localGuess.value.split(':')[0] < localGuess.value.split(":")[1]) || (
      localResult.value.split(':')[0] === localResult.value.split(":")[1] && localGuess.value.split(':')[0] === localGuess.value.split(":")[1])
  ) && localResult.value !== "-:-") {
    points.value = 20 - Math.abs(localResult.value.split(':')[0] - localGuess.value.split(':')[0]) - Math.abs(localResult.value.split(':')[1] - localGuess.value.split(':')[1]);
  }
  else points.value = 0;

  if (prevValue !== points.value) {
    emit('points-updated', points.value, prevValue);
  }
};

onMounted(() => {
  countPoints();
});

// Synchronizujte s props
watch(() => props.result, (newValue) => {
  localResult.value = newValue;
});

watch(() => props.guess, (newValue) => {
  localGuess.value = newValue;
});

watch([localResult, localGuess], countPoints, { immediate: true });

defineExpose({
  getValue() {
    return points.value;
  }
});
</script>

<template>
  <div class="match-item">
    <span>{{ match }}</span>
    <div class="match-point">
      <span><input contenteditable="true" v-model="localResult" /></span>
      <span><input contenteditable="true" v-model="localGuess" /></span>
      <span>{{ points }}</span>
    </div>
  </div>
</template>

