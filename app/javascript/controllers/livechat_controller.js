import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  static values = { livechatId: Number }
  static targets = ["messages"]

  connect() {
    this.channel = consumer.subscriptions.create(
      { channel: "LivechatChannel", livechat_id: this.livechatIdValue },
      {
        received: data => {
          this.appendMessage(data)
        }
      }
    )
  }

  disconnect() {
    this.channel.unsubscribe()
  }

  appendMessage(data) {
    // Using template literals for better readability and future HTML structure complexity
    const messageElement = `<div>${data.message}</div>`;
    this.messagesTarget.innerHTML += messageElement;
  }
}
