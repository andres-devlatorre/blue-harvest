import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="daily-video"
export default class extends Controller {
  static targets = ['daily']

  connect() {
  }

  endCall() {
    this.call.leave();
    this.call.destroy();
    this.call = null;
  }

  joinCall() {
    this.call = window.Daily.createFrame({
      iframeStyle: {
        position: 'fixed',
        border: '1px solid black',
        mode: 'grid',
        width: '100%',
        height: '450px',
        right: '0px',
        top: '250px',
      },
    });
    this.call.join({ url: 'https://blue-harvest.daily.co/blue-harvest-public' });

  }
}
