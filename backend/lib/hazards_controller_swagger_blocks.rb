class HazardsControllerSwaggerBlocks
  include Swagger::Blocks

  swagger_path '/hazards' do
    operation :get do
      key :description, 'Get the list of hazards'
      key :operationId, 'publicListHazards'
      key :produces, ['application/json']
      key :tags, ['hazards']
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
      parameter do
        key :name, :latitude
        key :in, :query
        key :description, 'Latitude for testing intersections'
        key :required, false
        schema do
          key :type, :float
        end
      end
      parameter do
        key :name, :longitude
        key :in, :query
        key :description, 'Longitude for testing intersections'
        key :required, false
        schema do
          key :type, :float
        end
      end

      response 200 do
        key :description, 'hazard list response'
        schema do
          key :'$ref', :HazardsResponse
        end
      end
    end
  end
end
