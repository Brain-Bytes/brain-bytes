class Byte < ApplicationRecord
  belongs_to :user
  has_many :byte_tags, dependent: :delete_all
  has_many :tags, through: :byte_tags
  has_many :likes, dependent: :delete_all

  validates :title, presence: true
  validates :body, presence: true
  validates :user_id, presence: true
end
