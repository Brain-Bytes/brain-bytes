module Mutations
  class AddLike < Mutations::BaseMutation
    argument :params, Types::Input::LikeInputType, required: true

    field :like, Types::LikeType, null: false

    def resolve(params:)
      params = Hash params
      begin
        like = Like.create!(params)

        # The resolve method in a mutation must return a hash whose symbol matches the field names
        { like: like }
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("Invalid attributes for #{e.record.class}:"\
          " #{e.record.errors.full_messages.join(', ')}")
      end
    end
  end
end
