<template>
  <div>
    <addRecord />
    <showAllPosts />
  </div>
</template>

<script>
import addRecord from '@/components/addRecord.vue'
import showAllPosts from '@/components/showAllPosts.vue'
export default {
  data() {
    return {
    }
  },
  components: {
    addRecord,
    showAllPosts
  },
  methods: {
  }
}
</script>

<style local>
.pac-target-input {
    outline: 1px solid #000;
    margin: 10px;
    border-radius: 5px;
    padding: 5px;
}
</style>
