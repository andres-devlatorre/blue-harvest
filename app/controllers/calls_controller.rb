class CallsController < ApplicationController
  def index
    @calls = Call.all
  end

  def new
    @call = Call.new
  end
end
