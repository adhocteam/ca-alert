require 'admin_hazards_controller_swagger_blocks'
require 'admin_reports_controller_swagger_blocks'
require 'admin_users_controller_swagger_blocks'
require 'alerts_controller_swagger_blocks'
require 'base_swagger_blocks'
require 'devise_swagger_blocks'
require 'phone_numbers_controller_swagger_blocks'
require 'places_controller_swagger_blocks'

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
    tag do
      key :name, 'admin/hazards'
      key :description, 'Administrative hazard actions'
    end
    tag do
      key :name, 'admin/reports'
      key :description, 'Administrative reporting actions'
    end
    tag do
      key :name, 'admin/users'
      key :description, 'Administrative user actions'
    end
    tag do
      key :name, 'alerts'
      key :description, 'Alerts-related actions'
    end
    tag do
      key :name, 'auth'
      key :description, 'Actions for authentication'
    end
    tag do
      key :name, 'phone_numbers'
      key :description, 'Actions for managing phone numbers'
    end
    tag do
      key :name, 'places'
      key :description, 'Actions for managing places'
    end
    tag do
      key :name, 'ping'
      key :description, 'An action for monitoring'
    end
    key :basePath, '/'
    key :schemes, ['http']
    key :consumes, ['application/json']
    key :produces, ['application/json']
  end

  # A list of all classes that have swagger_* declarations.
  SWAGGERED_CLASSES = [
    AdminHazardsControllerSwaggerBlocks,
    AdminReportsControllerSwaggerBlocks,
    AdminUsersControllerSwaggerBlocks,
    Alert,
    AlertsControllerSwaggerBlocks,
    BaseSwaggerBlocks,
    DeviseSwaggerBlocks,
    Hazard,
    PhoneNumber,
    PingController,
    Place,
    PhoneNumbersControllerSwaggerBlocks,
    PlacesControllerSwaggerBlocks,
    User,
    self
  ].freeze

  def index
    render json: Swagger::Blocks.build_root_json(SWAGGERED_CLASSES)
  end
end
