<template>
  <div class="fp-extension-landing-page">
    <div class="fp-extension-saleschannel-title">Sales Channel</div>

    <loader v-if="pageLoading"></loader>
    <div v-else class="content">
      <input
        class="saleschannel-search-input" 
        type="search" 
        name="Search Sales Channels" 
        placeholder="Search Sales Channels" 
        @input="searchApplication"
      >
      <div class="fp-extension-sales-channels-container">
        <div
          :key="application._id"
          class="fp-extension-app-box"
          v-for="application of application_list"
        >
          <div class="logo">
            <img :src="application.logo" />
          </div>
          <div class="line-1">{{ application.name }}</div>
          <div class="line-2">{{ application.domain.name }}</div>
          <div class="fp-extension-list-btn-cont"></div>
        </div>

        <div
          v-if="application_list.length % 3 == 2"
          class="fp-extension-app-box hidden"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import loader from "@/components/loader.vue";
import { ref, onMounted } from "vue";
import MainService from "../services/main-service";
export default {
  components: {
    loader,
  },
  setup() {
    let application_list = ref([]);
    let all_applications = ref([]);
    let pageLoading = ref(false);

    const fetchApplications = async () => {
      pageLoading.value = true;
      try {
        let { data } = await MainService.getAllApplications();
        all_applications.value = data.items;
        let temp = data.items.map((ele) => {
          ele.text = ele.name
          ele.value = ele._id
          ele.image = ele.logo
          ele.logo = ele.image && ele.image.secure_url
          return ele
        })
        application_list.value = temp
        pageLoading.value = false

      } catch (e) {
        pageLoading.value = false;
      }
    };

    const searchApplication = (event) => {
      let searchText = event.target.value
      if (!searchText) {
        application_list.value = all_applications.value.map((app) => app)
      } else {
        application_list.value = all_applications.value.filter((item) => {
          return item.name.toLowerCase().includes(searchText.toLowerCase());
        })
      }
    }

    onMounted(async () => {
      await fetchApplications()
    })
    return { application_list, pageLoading, searchApplication }
  },
};
</script>

<style lang="less" scoped>
.fp-extension-landing-page {
  font-family: "Inter", sans-serif;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  max-width: 1024px;
  margin: 24px auto;

  .fp-extension-saleschannel-title {
    font-family: "Inter", sans-serif;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 8px;
  }

  .fp-extension-sales-channels-container {
    display: flex;
    flex-wrap: wrap;
    margin: 24px 0;
    justify-content: space-between;

    .fp-extension-list-btn-cont {
      display: flex;
      justify-content: flex-end;

      .fp-extension-list-btn {
        display: flex;
        width: 40px;
        height: 40px;
        border: 1px solid #e4e5e6;
        border-radius: 4px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }

  .saleschannel-search-input {
    width: 100%;
    max-width: 1024px;
    height: 36px;
    border: 1px solid#ddd;
    padding: 0 20px;
  }

  .fp-extension-app-box {
    width: 261px;
    height: auto;
    background-color: white;
    border: 1px solid #e4e5e6;
    padding: 24px;
    border-radius: 4px;
    margin-bottom: 24px;

    & + .fp-extension-app-box:nth-child(3n + 1) {
      margin-left: 0;
    }

    .logo {
      width: 48px;
      height: 48px;

      img {
        width: 100%;
        height: auto;
      }
    }

    .line-1 {
      font-weight: 600;
      font-size: 16px;
      line-height: 26px;
    }

    .line-2 {
      color: #9b9b9b;
      line-height: 22px;
      font-size: 12px;
    }
  }
}

.hidden {
  visibility: hidden;
}
</style>