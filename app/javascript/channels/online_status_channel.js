import consumer from "./consumer"

consumer.subscriptions.create("OnlineStatusChannel", {
  connected() {
  },

  disconnected() {
  },

  received(data) {
    if (data.online) {
      console.log(`User ${data.user_id} is online.`);
    } else {
      console.log(`User ${data.user_id} is offline.`);
    }
  }
});
