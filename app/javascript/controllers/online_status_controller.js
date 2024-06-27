import {Controller} from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable";
export default class extends Controller {
  static values = { userId: Number, csrfToken: String }
  connect() {
    console.log(this.userIdValue)
    const url = `http://localhost:3000/users/${this.userIdValue}/online_status`
    console.log(this.csrfTokenValue)
    fetch(url,
      {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": this.csrfTokenValue
    },
      body: JSON.stringify({ online: true })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User online status updated:', data);
    })
}
}
