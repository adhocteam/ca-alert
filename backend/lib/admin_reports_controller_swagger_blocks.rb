# rubocop:disable Metrics/ClassLength
class AdminReportsControllerSwaggerBlocks
  include Swagger::Blocks

  swagger_path '/admin/reports/alerts' do
    operation :get do
      key :description, 'Get a report on the number of alerts sent over the past N days'
      key :operationId, 'alertsReport'
      key :produces, ['application/json']
      parameter do
        key :name, :days_back
        key :in, :query
        key :description, 'The number of days data to return'
        key :required, false
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :uid
        key :in, :header
        key :description, 'UID of the user'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :access_token
        key :in, :header
        key :description, 'Access token for the user'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :client
        key :in, :header
        key :description, 'Client value for the user'
        key :required, true
        schema do
          key :type, :string
        end
      end

      response 200 do
        key :description, 'report response'
        schema do
          key :'$ref', :DatedReportResponse
        end
      end

      response 401 do
        key :description, 'invalid authentication response'
        schema do
          key :'$ref', :Response
        end
      end
    end
  end

  swagger_path '/admin/reports/communication_methods' do
    operation :get do
      key :description, 'Get a report on the number of enabled communication methods'
      key :operationId, 'communicationMethodsReport'
      key :produces, ['application/json']
      parameter do
        key :name, :uid
        key :in, :header
        key :description, 'UID of the user'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :access_token
        key :in, :header
        key :description, 'Access token for the user'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :client
        key :in, :header
        key :description, 'Client value for the user'
        key :required, true
        schema do
          key :type, :string
        end
      end

      response 200 do
        key :description, 'report response'
        schema do
          key :'$ref', :CommunicationMethodsReportResponse
        end
      end

      response 401 do
        key :description, 'invalid authentication response'
        schema do
          key :'$ref', :Response
        end
      end
    end
  end

  swagger_path '/admin/reports/users' do
    operation :get do
      key :description, 'Get a report on the number of alerts sent over the past N days'
      key :operationId, 'alertsReport'
      key :produces, ['application/json']
      parameter do
        key :name, :days_back
        key :in, :query
        key :description, 'The number of days data to return'
        key :required, false
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :uid
        key :in, :header
        key :description, 'UID of the user'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :access_token
        key :in, :header
        key :description, 'Access token for the user'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :client
        key :in, :header
        key :description, 'Client value for the user'
        key :required, true
        schema do
          key :type, :string
        end
      end

      response 200 do
        key :description, 'report response'
        schema do
          key :'$ref', :DatedReportResponse
        end
      end

      response 401 do
        key :description, 'invalid authentication response'
        schema do
          key :'$ref', :Response
        end
      end
    end
  end

  swagger_schema :HazardResponse do
    property :status do
      key :type, :string
    end
    property :data do
      key :'$ref', :Hazard
    end
    property :errors do
      key :'$ref', :Errors
    end
  end

  swagger_schema :HazardsResponse do
    property :status do
      key :type, :string
    end
    property :data do
      key :type, :array
      items do
        key :'$ref', :Hazard
      end
    end
    property :errors do
      key :'$ref', :Errors
    end
  end
end
# rubocop:enable Metrics/ClassLength
