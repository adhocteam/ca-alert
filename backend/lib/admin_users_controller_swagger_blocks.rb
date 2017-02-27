class AdminUsersControllerSwaggerBlocks
  include Swagger::Blocks

  swagger_path '/admin/users/search' do
    operation :get do
      key :description, 'Search for users by email or phone number'
      key :operationId, 'listUsers'
      key :produces, ['application/json']
      key :tags, ['admin/users']
      parameter do
        key :name, :q
        key :in, :query
        key :description, 'The search query'
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
        key :description, 'user list response'
        schema do
          key :'$ref', :UsersResponse
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

  swagger_path '/admin/users/{id}/make_admin' do
    operation :patch do
      key :description, 'Make another user an admin'
      key :operationId, 'makeUserAdmin'
      key :produces, ['application/json']
      key :tags, ['admin/users']
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'The user\'s id'
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
        key :description, 'success response'
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
        key :description, 'user not found response'
        schema do
          key :'$ref', :Response
        end
      end
    end
  end

  swagger_path '/admin/users/{id}/resend_admin_email' do
    operation :patch do
      key :description, 'Resend the user\'s admin email'
      key :operationId, 'resendAdminEmail'
      key :produces, ['application/json']
      key :tags, ['admin/users']
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'The user\'s id'
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
        key :description, 'success response'
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
        key :description, 'user not found response'
        schema do
          key :'$ref', :Response
        end
      end
    end
  end

  swagger_schema :UsersResponse do
    property :status do
      key :type, :string
    end
    property :data do
      key :type, :array
      items do
        key :'$ref', :User
      end
    end
    property :errors do
      key :'$ref', :Errors
    end
  end
end
