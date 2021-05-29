module Types
  class ByteTagType < Types::BaseObject
    field :byte_id, ID, null: false
    field :tag_id, ID, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
