class ApidocsController < ActionController::Base
  include Swagger::Blocks

  swagger_root do
    key :swagger, '2.0'
    info do
      key :version, '1.0.0'
      key :title, 'California Hazard Alerts'
      key :description, 'An API to support the California hazard alerting application'
      # key :termsOfService, 'http://helloreverb.com/terms/'
      contact do
        key :name, 'Ad Hoc API Team'
      end
      license do
        key :name, 'MIT'
      end
    end
    if Rails.env.production?
      key :host, 'ca-alert.herokuapp.com'
    else
      key :host, 'localhost:3000'
    end
    key :basePath, '/'
    key :consumes, ['application/json']
    key :produces, ['application/json']
  end

  # A list of all classes that have swagger_* declarations.
  SWAGGERED_CLASSES = [
    PingController,
    self
  ].freeze

  def index
    render json: Swagger::Blocks.build_root_json(SWAGGERED_CLASSES)
  end
end
