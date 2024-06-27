import {Controller} from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable";
export default class extends Controller {
  connect() {
    console.log("Connected to the OnlineStatusChannel!")
    this.subscription = createConsumer().subscriptions.create(
      { channel: "OnlineStatusChannel" },
      {
        received: data => {
          console.log(data)
        }
      }
    )
}
