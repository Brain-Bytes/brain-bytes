module Types
  class MutationType < Types::BaseObject
    field :add_byte, mutation: Mutations::AddByte
  end
end
