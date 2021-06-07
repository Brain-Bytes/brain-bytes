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
    # field :likes, [Types::LikeType], null: false
    field :likes_count, Integer, null: false
    field :liked_by_current_user, Boolean, null: false

    def likes_count
      object.likes.count
    end

    def liked_by_current_user
      p 'CURRENT USER'
      p current_user
      p 'CURRENT USER'
    end
  end
end
