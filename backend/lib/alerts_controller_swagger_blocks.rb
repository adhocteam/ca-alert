class AlertsControllerSwaggerBlocks
  include Swagger::Blocks

  swagger_path '/alerts' do
    operation :get do
      key :description, 'Retrieve your list of alerts'
      key :operationId, 'listAlerts'
      key :produces, ['application/json']
      key :tags, ['alerts']
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
        key :description, 'alert list response'
        schema do
          key :'$ref', :AlertsResponse
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

  swagger_schema :AlertsResponse do
    property :status do
      key :type, :string
    end
    property :data do
      key :type, :array
      items do
        key :'$ref', :Alert
      end
    end
    property :errors do
      key :'$ref', :Errors
    end
  end
end
