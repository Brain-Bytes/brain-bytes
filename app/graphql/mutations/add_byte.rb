module Mutations
  class AddByte < Mutations::BaseMutation
    argument :params, Types::Input::ByteInputType, required: true

    field :byte, Types::ByteType, null: false

    def resolve(params:)
      byte_params = Hash params

      begin
        byte = Byte.create!(byte_params)

        # The resolve method in a mutation must return a hash whose symbol matches the field names
        { byte: byte }
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("Invalid attributes for #{e.record.class}:"\
          " #{e.record.errors.full_messages.join(', ')}")
      end
    end
  end
end
