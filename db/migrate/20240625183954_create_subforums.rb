class CreateSubforums < ActiveRecord::Migration[7.1]
  def change
    create_table :subforums do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
