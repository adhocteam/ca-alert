# rubocop:disable Metrics/ClassLength
class PlacesControllerSwaggerBlocks
  include Swagger::Blocks

  swagger_path '/places' do
    operation :get do
      key :description, 'Retrieve your list of places'
      key :operationId, 'listPlaces'
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
        key :description, 'place list response'
        schema do
          key :'$ref', :PlacesResponse
        end
      end

      response 401 do
        key :description, 'invalid authentication response'
        schema do
          key :'$ref', :Response
        end
      end
    end

    operation :post do
      key :description, 'Create a place'
      key :operationId, 'createPlace'
      key :produces, ['application/json']
      parameter do
        key :name, :name
        key :in, :body
        key :description, 'Name of the new place'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :latitude
        key :in, :body
        key :description, 'Latitude of the new place'
        key :required, true
        schema do
          key :type, :number
          key :format, :float
        end
      end
      parameter do
        key :name, :longitude
        key :in, :body
        key :description, 'Longitude of the new place'
        key :required, true
        schema do
          key :type, :number
          key :format, :float
        end
      end
      parameter do
        key :name, :address
        key :in, :body
        key :description, 'Address of the new place'
        key :required, true
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
        key :description, 'place creation response'
        schema do
          key :'$ref', :PlaceResponse
        end
      end

      response 400 do
        key :description, 'place creation error response'
        schema do
          key :'$ref', :PlaceResponse
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

  swagger_path '/places/{id}' do
    operation :get do
      key :description, 'Show a place'
      key :operationId, 'showPlace'
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
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'Id of the place'
        key :required, true
        key :type, :integer
        key :format, :int64
      end

      response 200 do
        key :description, 'place query response'
        schema do
          key :'$ref', :PlaceResponse
        end
      end

      response 401 do
        key :description, 'invalid authentication response'
        schema do
          key :'$ref', :Response
        end
      end

      response 404 do
        key :description, 'place not found response'
        schema do
          key :'$ref', :Response
        end
      end
    end

    operation :patch do
      key :description, 'Update a place'
      key :operationId, 'updatePlace'
      key :produces, ['application/json']
      parameter do
        key :name, :name
        key :in, :body
        key :description, 'New name for the place'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :latitude
        key :in, :body
        key :description, 'New latitude for the place'
        key :required, true
        schema do
          key :type, :number
          key :format, :float
        end
      end
      parameter do
        key :name, :longitude
        key :in, :body
        key :description, 'New longitude for the place'
        key :required, true
        schema do
          key :type, :number
          key :format, :float
        end
      end
      parameter do
        key :name, :address
        key :in, :body
        key :description, 'New address for the place'
        key :required, true
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
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'Id of the place'
        key :required, true
        key :type, :integer
        key :format, :int64
      end

      response 200 do
        key :description, 'place query response'
        schema do
          key :'$ref', :PlaceResponse
        end
      end

      response 401 do
        key :description, 'invalid authentication response'
        schema do
          key :'$ref', :Response
        end
      end

      response 404 do
        key :description, 'place not found response'
        schema do
          key :'$ref', :Response
        end
      end
    end

    operation :delete do
      key :description, 'Delete a place'
      key :operationId, 'deletePlace'
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
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'Id of the place'
        key :required, true
        key :type, :integer
        key :format, :int64
      end

      response 200 do
        key :description, 'place delete response'
        schema do
          key :'$ref', :Response
        end
      end

      response 401 do
        key :description, 'invalid authentication response'
        schema do
          key :'$ref', :Response
        end
      end

      response 404 do
        key :description, 'place not found response'
        schema do
          key :'$ref', :Response
        end
      end
    end
  end

  swagger_schema :PlaceResponse do
    property :status do
      key :type, :string
    end
    property :data do
      key :'$ref', :Place
    end
    property :errors do
      key :'$ref', :Errors
    end
  end

  swagger_schema :PlacesResponse do
    property :status do
      key :type, :string
    end
    property :data do
      key :type, :array
      items do
        key :'$ref', :Place
      end
    end
    property :errors do
      key :'$ref', :Errors
    end
  end
end
# rubocop:enable Metrics/ClassLength
