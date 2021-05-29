module Types
  module Input
    class ByteTagInputType < Types::BaseInputObject
      argument :byte_id, ID, required: true
      argument :tag_id, ID, required: true
    end
  end
end
