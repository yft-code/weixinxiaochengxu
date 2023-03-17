<template>
   <div class="wrap">
    <div>
        <audio class="audio"
           src="@/assets/voice/warnings.mp3"
           controls
           muted="muted"
           id="warningAudio"
           hidden="true">
    </audio>
    </div>
   </div>
</template>

<script>
export default {
mounted(){
    let warningAudioDom = document.getElementById('warningAudio')
    // 触发交互
	warningAudioDom.pause()
},
methods:{
  getVoices(){
  this.$nextTick(()=>{
  let warningAudioDom = document.getElementById('warningAudio')
  warningAudioDom.play()
 }) 
}
}
}
</script>

<style>

</style>