class Folder < ApplicationRecord
  belongs_to :byte
  belongs_to :user
end
