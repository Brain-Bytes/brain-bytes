module Types
  module Input
    class ByteInputType < Types::BaseInputObject
      argument :title, String, required: true
      argument :body, String, required: true
      argument :user_id, ID, required: true
    end
  end
end
