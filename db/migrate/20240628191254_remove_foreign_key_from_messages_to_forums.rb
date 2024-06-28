class RemoveForeignKeyFromMessagesToForums < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :messages, column: :livechat_id
  end
end
