<template>
  <div>
    <div>

    </div>
   {{ month }} {{ day }} {{ minutes }} {{seconds}}
  </div>
</template>

<script>
export default {
props:["datTo"],
data(){
    return{
    
        month:new Date("2022-02-01").getMonth(),
        day:new Date("2022-02-01").getDay(),
        minutes:new Date("2022-02-01").getMinutes(),
        seconds:new Date("2022-02-01").getSeconds(),
       
    }
},
methods:{
    
}
}
</script>

<style>

</style>