class PhoneNumbersControllerSwaggerBlocks
  include Swagger::Blocks

  swagger_path '/phone_numbers' do
    operation :post do
      key :description, 'Create a phone number'
      key :operationId, 'createPhoneNumber'
      key :produces, ['application/json']
      parameter do
        key :name, :phone_number
        key :in, :body
        key :description, 'The number to use'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :notifications_enabled
        key :in, :body
        key :description, 'Are notifications enabled for this number'
        key :required, false
        schema do
          key :type, :boolean
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
        key :description, 'phone number creation response'
        schema do
          key :'$ref', :PhoneNumberResponse
        end
      end

      response 400 do
        key :description, 'phone number creation error response'
        schema do
          key :'$ref', :PhoneNumberResponse
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

  swagger_path '/phone_numbers/{id}' do
    operation :delete do
      key :description, 'Delete a phone number'
      key :operationId, 'deletePhoneNumber'
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
        key :description, 'Id of the phone number'
        key :required, true
        key :type, :integer
        key :format, :int64
      end

      response 200 do
        key :description, 'phone number delete response'
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
        key :description, 'phone number not found response'
        schema do
          key :'$ref', :Response
        end
      end
    end
  end

  swagger_path '/phone_numbers/{id}/verify' do
    operation :patch do
      key :description, 'Verify a phone number'
      key :operationId, 'verifyPhoneNumber'
      key :produces, ['application/json']
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'Id of the phone number'
        key :required, true
        key :type, :integer
        key :format, :int64
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
        key :description, 'phone number deletion response'
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
        key :description, 'phone number not found response'
        schema do
          key :'$ref', :Response
        end
      end
    end
  end

  swagger_schema :PhoneNumberResponse do
    property :status do
      key :type, :string
    end
    property :data do
      key :'$ref', :PhoneNumber
    end
    property :errors do
      key :'$ref', :Errors
    end
  end
end
