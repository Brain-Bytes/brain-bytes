class Byte < ApplicationRecord
  belongs_to :user
  has_many :byte_tags
  has_many :tags, through: :byte_tags

  validates :title, presence: true
  validates :body, presence: true
  validates :user_id, presence: true
end
