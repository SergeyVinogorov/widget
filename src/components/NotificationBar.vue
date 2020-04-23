<template>
  <div>
    <b-notification
      :type="notificationTypeClass"
      aria-close-label="Close notification"
      role="alert"
      @click="this.removeMessage"
      class="notification-message "
    >
      <p class="media-text">{{ notification.message }}</p>
    </b-notification>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NotificationBar",
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 3000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  computed: {
    notificationTypeClass() {
      let typeNotification = "is-success";
      if (this.notification.type == "success") {
        typeNotification = "is-success";
      }
      if (this.notification.type == "error") {
        typeNotification = "is-danger";
      }
      return typeNotification;
    },
  },
  methods: {
    ...mapActions(["remove"]),
    removeMessage() {
      this.remove(this.notification);
    },
  },
};
</script>

<style lang="scss" scoped>
.notification-message {
  display: flex;
  justify-content: center;
  align-items: center;
  .media-text {
    padding: 0px 15px;
  }
}
</style>
