import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  static values = { livechatId: Number }

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
    const messagesContainer = document.getElementById('messages'); // make sure this slop is properly referred in the views
    const messageElement = document.createElement('div'); // probably a better way to do this garbage
    messageElement.innerText = data.message;
    messagesContainer.appendChild(messageElement);
  }
}
