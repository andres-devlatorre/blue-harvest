class AddCorrectForeignKeyToPosts < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :posts, :subforums, column: :subforum_id
  end
end
