<template>
  <div class="home">
		<Header/>
		<HeroShayna/>
		<WomenShayna/>
		<InstaShayna/>
		<PartnerShayna/>
		<FooterShayna/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import HeroShayna from '@/components/HeroShayna'
import WomenShayna from '@/components/WomenShayna'
import InstaShayna from '@/components/InstaShayna'
import PartnerShayna from '@/components/PartnerShayna'
import FooterShayna from '@/components/FooterShayna'

export default {
  name: 'Home',
  components: {
    Header,
    HeroShayna,
    WomenShayna,
    InstaShayna,
    PartnerShayna,
    FooterShayna
  }
}
</script>
