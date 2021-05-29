module Mutations
  class AddByteTag < Mutations::BaseMutation
    argument :params, Types::Input::ByteTagInputType, required: true

    field :byte_tag, Types::ByteTagType, null: false

    def resolve(params:)
      byte_tag_params = Hash params

      begin
        byte_tag = ByteTag.create!(byte_tag_params)

        # The resolve method in a mutation must return a hash whose symbol matches the field names
        { byte_tag: byte_tag }
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("Invalid attributes for #{e.record.class}:"\
          " #{e.record.errors.full_messages.join(', ')}")
      end
    end
  end
end
