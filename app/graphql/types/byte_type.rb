module Types
  class ByteType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :body, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :id, ID, null: false
    field :title, String, null: false
    field :body, String, null: false
    field :user, Types::UserType, null: false
    field :tags, [Types::TagType], null: false
    field :likes, [Types::LikeType], null: false
    field :likes, Integer, null: false

    def likes
      object.likes.count
    end
  end
end
