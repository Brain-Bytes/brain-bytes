module Types
  module Input
    class ByteInputType < Types::BaseInputObject
      argument :title, String, required: true
      argument :body, String, required: true
      argument :user_id, ID, required: true
      # argument :byte_tags, [Types::ByteTagInputType], required: false
    end
  end
end
