module Mutations
  class AddTag < Mutations::BaseMutation
    argument :params, Types::Input::TagInputType, required: true

    field :tag, Types::TagType, null: false

    def resolve(params:)
      tag_params = Hash params

      begin
        tag = Tag.create!(tag_params)

        # The resolve method in a mutation must return a hash whose symbol matches the field names
        { tag: tag }
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("Invalid attributes for #{e.record.class}:"\
          " #{e.record.errors.full_messages.join(', ')}")
      end
    end
  end
end
