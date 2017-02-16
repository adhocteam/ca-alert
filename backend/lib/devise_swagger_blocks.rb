class DeviseSwaggerBlocks
  include Swagger::Blocks

  swagger_path '/auth' do
    operation :post do
      key :description, 'Create an account'
      key :operationId, 'createAccount'
      key :produces, ['application/json']
      parameter do
        key :name, :email
        key :in, :query
        key :description, 'Email address of the new user'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :password
        key :in, :query
        key :description, 'Password for the user'
        key :required, true
        schema do
          key :type, :string
          key :format, :password
        end
      end
      parameter do
        key :name, :password_confirmation
        key :in, :query
        key :description, 'Password for the user again, must match password parameter'
        key :required, true
        schema do
          key :type, :string
          key :format, :password
        end
      end

      response 200 do
        key :description, 'user creation response'
        schema do
          key :'$ref', :UserResponse
        end
      end

      response 422 do
        key :description, 'user creation error response'
        schema do
          key :'$ref', :UserResponse
        end
      end
    end

    operation :put do
      key :description, 'Update your account'
      key :operationId, 'updateAccount'
      key :produces, ['application/json']
      parameter do
        key :name, :password
        key :in, :query
        key :description, 'New password for the user'
        key :required, false
        schema do
          key :type, :string
          key :format, :password
        end
      end
      parameter do
        key :name, :password_confirmation
        key :in, :query
        key :description, 'New password for the user again, must match password parameter'
        key :required, false
        schema do
          key :type, :string
          key :format, :password
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
        key :description, 'account update response'
        schema do
          key :'$ref', :UserResponse
        end
      end

      response 422 do
        key :description, 'account update error response'
        schema do
          key :'$ref', :UserResponse
        end
      end
    end

    operation :delete do
      key :description, 'Delete an account'
      key :operationId, 'deleteAccount'
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
        key :description, 'user deletion response'
        schema do
          key :'$ref', :Response
        end
      end

      response 404 do
        key :description, 'failed user deletion response'
        schema do
          key :'$ref', :Response
        end
      end
    end
  end

  swagger_path '/auth/sign_in' do
    operation :post do
      key :description, 'Authenticate your account'
      key :operationId, 'signIn'
      key :produces, ['application/json']
      parameter do
        key :name, :email
        key :in, :query
        key :description, 'Email address of the user'
        key :required, true
        schema do
          key :type, :string
        end
      end
      parameter do
        key :name, :password
        key :in, :query
        key :description, 'Password for the user'
        key :required, true
        schema do
          key :type, :string
          key :format, :password
        end
      end

      response 200 do
        key :description, 'user creation response'
        schema do
          key :'$ref', :UserResponse
        end
        header 'access-token' do
          key :description, 'User access token'
          key :type, :string
        end
        header 'client' do
          key :description, 'Client id for the user'
          key :type, :string
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

  swagger_path '/auth/sign_out' do
    operation :post do
      key :description, 'Authenticate your account'
      key :operationId, 'signIn'
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
        key :description, 'sign out response'
        schema do
          key :success, :boolean
        end
      end

      response 404 do
        key :description, 'invalid authentication response'
        schema do
          key :'$ref', :Response
        end
      end
    end
  end

  swagger_schema :Response do
    key :required, [:status]
    property :status do
      key :type, :string
    end
    property :message do
      key :type, :string
    end
    property :errors do
      key :type, :array
      items do
        key :type, :string
      end
    end
  end

  swagger_schema :UserResponse do
    property :status do
      key :type, :string
    end
    property :data do
      key :'$ref', :User
    end
    property :errors do
      key :'$ref', :Errors
    end
  end

  swagger_schema :Errors do
    key :required, [:full_messages]
    property :full_messages do
      key :type, :array
      items do
        key :type, :string
      end
    end
  end
end
