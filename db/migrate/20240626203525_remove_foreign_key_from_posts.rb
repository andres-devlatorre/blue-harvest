class RemoveForeignKeyFromPosts < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :posts, column: :subforum_id
  end
end
