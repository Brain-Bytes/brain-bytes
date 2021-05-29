module Queries
  class FetchTags < Queries::BaseQuery
    # data returned by this query should be an array of the already created ByteType
    type [Types::TagType], null: false

    def resolve
      Tag.all.order(name: :asc)
    end
  end
end
