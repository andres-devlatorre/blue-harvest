class CreateLivechats < ActiveRecord::Migration[7.1]
  def change
    create_table :livechats do |t|
      t.boolean :authorization

      t.timestamps
    end
  end
end
