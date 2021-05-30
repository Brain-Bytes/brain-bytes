module Mutations
  class AddByte < Mutations::BaseMutation
    argument :params, Types::Input::ByteInputType, required: true

    field :byte, Types::ByteType, null: false

    def resolve(params:)
      params = Hash params
      begin
        byte = Byte.new(title: params[:title], body: params[:body], user_id: params[:user_id])
        if byte.save
          tags = params[:tags]
          tags.each do |tag_params|
            tag = Tag.find_by(name: tag_params[:name])
            if tag
              ByteTag.create!(byte_id: byte.id, tag_id: tag.id)
            else
              tag = Tag.new(name: tag_params[:name])
              ByteTag.create!(byte_id: byte.id, tag_id: tag.id) if tag.save
            end
          end
        end
        # The resolve method in a mutation must return a hash whose symbol matches the field names
        { byte: byte }
      rescue ActiveRecord::RecordInvalid => e
        GraphQL::ExecutionError.new("Invalid attributes for #{e.record.class}:"\
          " #{e.record.errors.full_messages.join(', ')}")
      end
    end
  end
end
