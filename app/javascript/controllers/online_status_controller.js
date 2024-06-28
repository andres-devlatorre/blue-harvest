import {Controller} from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

export default class extends Controller {
  static targets = [ "users" ]
  static values = { userId: Number}

  connect() {
    this.updateOnlineStatus(true)
    this.subscription = createConsumer().subscriptions.create(
      { channel: 'OnlineStatusChannel' },
      {
        received: data => this.handleReceived(data)
      }
    )
  }

  disconnect() {
    this.updateOnlineStatus(false)
    this.subscription.unsubscribe()
  }

  async updateOnlineStatus(status) {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const response = await fetch(`/users/${this.userIdValue}/online_status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRF-Token': token
      },
      body: `online=${status}`
    });

    if (!response.ok) {
      console.error('Failed to update online status');
    }
  }

  handleReceived(data) {

    const userElement = this.usersTarget.querySelector(`[data-user-id='${data.user_id}']`)

    if (data.online) {
      if (!userElement) {
        this.usersTarget.insertAdjacentHTML('beforeend', data.html)
      }
    } else {
      if (userElement) {
        userElement.remove()
      }
    }
  }
}
