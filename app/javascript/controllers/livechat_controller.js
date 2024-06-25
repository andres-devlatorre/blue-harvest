import { Controller } from "@hotwired/stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
  static values = { livechatId: Number }

  connect() {
    this.channel = consumer.subscriptions.create(
      { channel: "LivechatChannel", livechat_id: this.livechatIdValue },
      {
        received: data => {
          // Handle the incoming message data
          console.log(data)
        }
      }
    )
  }

  disconnect() {
    this.channel.unsubscribe()
  }
}
