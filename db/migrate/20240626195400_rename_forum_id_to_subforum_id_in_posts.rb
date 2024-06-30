class RenameForumIdToSubforumIdInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :forum_id, :subforum_id
  end
end
