module Mutations
  class ToggleLike < Mutations::BaseMutation
    argument :user_id, ID, required: true
    argument :byte_id, ID, required: true

    field :like, Types::LikeType, null: false
    field :byte, Types::ByteType, null: false

    def resolve(user_id:, byte_id:)
      like = Like.find_by(user_id: user_id, byte_id: byte_id)
      if like
        like.destroy
      else
        like = Like.create!(user_id: user_id, byte_id: byte_id)
      end

      byte = Byte.find(byte_id)
      p "BYTE"
      p byte

      # The resolve method in a mutation must return a hash whose symbol matches the field names
      { like: like, byte: byte }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid attributes for #{e.record.class}:"\
        " #{e.record.errors.full_messages.join(', ')}")
    end
  end
end
