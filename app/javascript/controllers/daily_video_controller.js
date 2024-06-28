import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="daily-video"
export default class extends Controller {
  static values = { url: String }
  static targets = ['daily']

  connect() {
    this.load()
  }

  load() {
    fetch(this.urlValue)
      .then(response => response.text())
      .then(html => this.element.innerHTML = html)
  }
}
