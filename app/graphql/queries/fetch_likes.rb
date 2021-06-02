module Queries
  class FetchLikes < Queries::BaseQuery
    # data returned by this query should be an array of the already created ByteType
    type [Types::LikeType], null: false

    def resolve
      Like.all
    end
  end
end
