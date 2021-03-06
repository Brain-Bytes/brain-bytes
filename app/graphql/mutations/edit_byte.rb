module Mutations
  class EditByte < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :params, Types::Input::ByteInputType, required: true

    field :byte, Types::ByteType, null: false

    def resolve(id:, params:)
      byte_params = Hash params

      begin
        byte = Byte.find_by!(id: id, user_id: context[:current_user].id)
        byte.update!(byte_params)

        # The resolve method in a mutation must return a hash whose symbol matches the field names
        { byte: byte }
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("Invalid attributes for #{e.record.class}:"\
          " #{e.record.errors.full_messages.join(', ')}")
      end
    end
  end
end
