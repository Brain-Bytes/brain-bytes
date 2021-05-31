class ChangePseudoToUsername < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :pseudo
    add_column :users, :username, :string, null: false
  end
end
