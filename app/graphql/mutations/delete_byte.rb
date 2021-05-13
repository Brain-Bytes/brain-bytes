module Mutations
  class DeleteByte < Mutations::BaseMutation
    argument :id, ID, required: true

    field :byte, Types::ByteType, null: false

    def resolve(id:)
      byte = Byte.find(id)

      begin
        byte.delete

        # The resolve method in a mutation must return a hash whose symbol matches the field names
        { byte: byte }
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("Invalid attributes for #{e.record.class}:"\
          " #{e.record.errors.full_messages.join(', ')}")
      end
    end
  end
end
