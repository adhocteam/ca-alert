class AdminHazardsControllerSwaggerBlocks
  include Swagger::Blocks

  swagger_path '/admin/hazards' do
    operation :post do
      key :description, 'Create a hazard'
      key :operationId, 'createHazard'
      key :produces, ['application/json']
      key :tags, ['admin/hazards']
      parameter do
        key :name, :title
        key :in, :body
        key :description, 'The title of the hazard'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :message
        key :in, :body
        key :description, 'The message for the hazard'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :latitude
        key :in, :body
        key :description, 'The lat position for the hazard'
        key :required, true
        schema do
          key :type, :number
          key :format, :float
        end
      end
      parameter do
        key :name, :longitude
        key :in, :body
        key :description, 'The lon position for the hazard'
        key :required, true
        schema do
          key :type, :number
          key :format, :float
        end
      end
      parameter do
        key :name, :radius_in_meters
        key :in, :body
        key :description, 'The radius of the hazard'
        key :required, true
        schema do
          key :type, :number
          key :format, :float
        end
      end
      parameter do
        key :name, :address
        key :in, :body
        key :description, 'Address information'
        key :required, false
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :link
        key :in, :body
        key :description, 'A URL to include with the hazard'
        key :required, false
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :phone_number
        key :in, :body
        key :description, 'A phone number to include with the hazard'
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
        key :description, 'hazard creation response'
        schema do
          key :'$ref', :HazardResponse
        end
      end

      response 400 do
        key :description, 'hazard creation error response'
        schema do
          key :'$ref', :HazardResponse
        end
      end

      response 401 do
        key :description, 'invalid authentication response'
        schema do
          key :'$ref', :Response
        end
      end
    end

    operation :get do
      key :description, 'Get the list of hazards'
      key :operationId, 'listHazards'
      key :produces, ['application/json']
      key :tags, ['admin/hazards']
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
        key :description, 'hazard list response'
        schema do
          key :'$ref', :HazardsResponse
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
