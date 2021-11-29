<template>
  <div class="about">
    <h1>This is an about page</h1>
    <nitrozen-button :theme="'secondary'" id="click-me" @click="clickMe" v-flat-btn
      >Get Applications</nitrozen-button
    >
    <div class="applications-list">
      <div class="application" v-for="(item, index) in applicationData.items"
                                :key="index">
        <img :src="item.logo.secure_url"/>
        <div class="application-name">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NitrozenButton } from "@gofynd/nitrozen-vue";
import MainService from "./../services/main-service";
export default {
  name: "About",
  components: {
    NitrozenButton,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      applicationData: {},
    }
  },
  methods: {
    clickMe() {
      MainService.getAllApplications()
        .then(({data}) => {
          this.applicationData = data
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.applications-list{
  margin-top: 24px;
  .application{
    padding: 24px;
    width: calc(50% - 24px);
    display: flex;
    align-items: center;
    margin: 0 24px;
    background-color: white;
    border-radius: 3px;
    img{
      height: 50px;
      width: 50px;
    }
    .application-name{
      padding-left: 12px;
    }
  }
}
</style>
