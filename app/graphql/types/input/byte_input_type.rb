module Types
  module Input
    class ByteInputType < Types::BaseInputObject
      argument :title, String, required: true
      argument :body, String, required: true
      argument :user_id, ID, required: true
      argument :tags, [Types::Input::TagInputType], required: false
    end
  end
end
