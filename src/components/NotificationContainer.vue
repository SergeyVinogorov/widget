<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in takeNotifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from "./NotificationBar";
import { mapState } from "vuex";
export default {
  components: {
    NotificationBar,
  },
  computed: {
    takeNotifications() {
      return this.$store.state.notification.notifications;
    },
  },
};
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  left: 50%;
  margin-left: -100px;
  bottom: 20%;

  background-color: #ffffff;

  min-width: 200px;
  display: flex;
  flex-direction: column;
  z-index: 5;
}
</style>
