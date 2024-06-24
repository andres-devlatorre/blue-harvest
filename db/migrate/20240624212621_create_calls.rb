class CreateCalls < ActiveRecord::Migration[7.1]
  def change
    create_table :calls do |t|
      t.boolean :connected
      t.string :call_category
      t.references :speaker, null: false, foreign_key: { to_table: :users }
      t.references :listener, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
