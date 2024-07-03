class AddDetailsToLivechats < ActiveRecord::Migration[7.1]
  def change
    add_reference :livechats, :participant1_id, null: false, foreign_key: { to_table: :users }
    add_reference :livechats, :participant2_id, null: false, foreign_key: { to_table: :users }
    add_column :livechats, :status, :string
  end
end
