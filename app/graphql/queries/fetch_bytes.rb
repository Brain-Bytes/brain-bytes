module Queries
  class FetchBytes < Queries::BaseQuery

    # data returned by this query should be an array of the already created ByteType
    type [Types::ByteType], null: false

    def resolve
      Byte.all.order(created_at: :desc)
    end
  end
end
