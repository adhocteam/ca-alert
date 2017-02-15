class PingController < ApplicationController
  def show
    render text: 'success', status: 200
  end
end
