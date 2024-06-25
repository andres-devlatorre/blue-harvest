class RenameLivechatColumn < ActiveRecord::Migration[7.1]
  def change
    rename_column :messages, :forum_id, :livechat_id
  end
end
