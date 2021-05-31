class AddUserIdToBytes < ActiveRecord::Migration[6.1]
  def change
    add_reference :bytes, :user, null: false, foreign_key: true
  end
end
