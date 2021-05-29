class Tag < ApplicationRecord
  has_many :byte_tags
  has_many :bytes, through: :byte_tags

  validates :name, presence: true
  validates :name, uniqueness: true
end
