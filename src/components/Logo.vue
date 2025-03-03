<script setup>
console.log("ga");

</script>

<template>
  <h1>BOOK HORIZON</h1>
</template>
<style lang="scss">

h1{
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: calc(16px*0.05);
  color:var(--text-color);

  @include breakpoint($tablet){
    font-size: 24px;
    line-height: 24px;
    letter-spacing: calc(24px*0.05);
  }
}
</style>