module Types
  module Input
    class LikeInputType < Types::BaseInputObject
      argument :user_id, ID, required: true
      argument :byte_id, ID, required: true
    end
  end
end
