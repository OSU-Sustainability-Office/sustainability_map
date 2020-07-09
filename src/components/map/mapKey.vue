<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-03-27T17:28:17-07:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-03-27T17:28:17-07:00
-->

<template>
  <div class="main container">
    <div class="head row">
      <div class="col text-center">
        OSU Sustainability Map
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapKey',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head {
    font-family: "StratumNo2";
  }
  .main {
    top: 0px;
    height: 100%;
    background-color: red;
  }
</style>
