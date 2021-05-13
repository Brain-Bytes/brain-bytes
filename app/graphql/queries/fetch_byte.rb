module Queries
  class FetchByte < Queries::BaseQuery
    type Types::ByteType, null: false
    argument :id, ID, required: true

    def resolve(id:)
      Byte.find(id)
    rescue ActiveRecord::RecordNotFound => _e
      GraphQL::ExecutionError.new('Byte does not exist.')
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("Invalid attributes for #{e.record.class}:"\
        " #{e.record.errors.full_messages.join(', ')}")
    end
  end
end
