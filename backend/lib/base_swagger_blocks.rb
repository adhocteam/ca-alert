class BaseSwaggerBlocks
  include Swagger::Blocks

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
