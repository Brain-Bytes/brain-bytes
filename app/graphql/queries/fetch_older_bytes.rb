module Queries
  class FetchOlderBytes < Queries::BaseQuery
    type [Types::ByteType], null: false
    argument :last_byte_id, ID, required: true

    def resolve(last_byte_id:)
      Byte.order(created_at: :desc).where('id < ?', last_byte_id).limit(10)
    end
  end
end
