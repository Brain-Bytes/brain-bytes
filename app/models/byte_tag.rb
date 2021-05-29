class ByteTag < ApplicationRecord
  belongs_to :byte
  belongs_to :tag

  validates :byte_id, presence: true
  validates :tag_id, presence: true
  validates :byte_id, uniqueness: { scope: :tag_id }
end
