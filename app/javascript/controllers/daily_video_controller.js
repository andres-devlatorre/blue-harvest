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
        position: 'right',
        border: '1px solid black',
        mode: 'grid',
        width: '1000px',
        height: '450px',
        right: '1em',
        bottom: '1em',
      },
    });
    this.call.join({ url: 'https://blue-harvest.daily.co/blue-harvest-public' });

  }
}
