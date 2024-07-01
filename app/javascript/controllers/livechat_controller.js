import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

export default class extends Controller {
  static values = { id: Number }
  static targets = ["messages"]

  connect() {
    console.log(this.idValue)
    this.channel = createConsumer().subscriptions.create(
      { channel: "LivechatChannel", id: this.idValue },
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
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
  }
}
