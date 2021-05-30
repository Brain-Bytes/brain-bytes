module Types
  module Input
    class TagInputType < Types::BaseInputObject
      argument :name, String, required: true
    end
  end
end
