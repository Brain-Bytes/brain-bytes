module Types
  class MutationType < Types::BaseObject
    field :add_byte, mutation: Mutations::AddByte
    field :delete_byte, mutation: Mutations::DeleteByte
    field :edit_byte, mutation: Mutations::EditByte
  end
end
