class Like < ApplicationRecord
  belongs_to :byte
  belongs_to :user

  validates :user_id, presence: true
  validates :byte_id, presence: true
  validates :byte_id, uniqueness: { scope: :user_id }
end
