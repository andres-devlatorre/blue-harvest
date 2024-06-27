# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "bootstrap", to: "bootstrap.min.js", preload: true
pin "@popperjs/core", to: "popper.js", preload: true
pin "vue-video-conference-lite" # @1.0.2
pin "@vueuse/components", to: "@vueuse--components.js" # @10.11.0
pin "@vueuse/core", to: "@vueuse--core.js" # @10.11.0
pin "@vueuse/shared", to: "@vueuse--shared.js" # @10.11.0
pin "feather-icons" # @4.29.2
pin "mitt" # @3.0.1
pin "vue" # @3.4.30
pin "vue-demi" # @0.14.8
pin "vue-feather" # @2.0.0
