import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form", "input"]

  connect() {
  console.log(this.inputTarget.value)
  }

  success() {
    setTimeout(() => { this.inputTarget.value = ""; }, 1);
  }
}
