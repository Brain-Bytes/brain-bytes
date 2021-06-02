module Types
  class MutationType < Types::BaseObject
    field :add_byte, mutation: Mutations::AddByte
    field :delete_byte, mutation: Mutations::DeleteByte
    field :edit_byte, mutation: Mutations::EditByte
    field :add_like, mutation: Mutations::AddLike
    field :delete_like, mutation: Mutations::DeleteLike
  end
end
