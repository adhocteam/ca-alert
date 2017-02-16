class PingController < ApplicationController
  include Swagger::Blocks

  swagger_path '/ping' do
    operation :get do
      key :description, 'Returns a trivial response so clients can check that the service is alive'
      key :operationId, 'ping'
      key :produces, ['application/json']
      response 200 do
        key :description, 'ping response'
        schema do
          key :type, :string
        end
      end
    end
  end

  def show
    render json: 'success', status: 200
  end
end
