class CreateByteTags < ActiveRecord::Migration[6.1]
  def change
    create_table :byte_tags do |t|
      t.references :byte, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
