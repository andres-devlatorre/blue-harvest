import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { senderId: Number }

  initialize() {
    this.setReversed()
  }

  setReversed() {
    const userId = document.querySelector('meta[name="current-user-id"]').getAttribute('content');
    if (userId != this.senderIdValue) {
      this.element.classList.add('reversed')
    }
  }
}
